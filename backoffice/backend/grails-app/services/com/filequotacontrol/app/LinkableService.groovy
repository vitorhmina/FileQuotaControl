package com.filequotacontrol.app

import groovy.util.logging.Slf4j
import groovy.time.TimeCategory

import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.nio.file.Paths

@Slf4j("log")
class LinkableService {

    FolderService folderService;
    DocumentService documentService;
    LinkableService linkableService;

    LinkableData generateDocumentLink(Integer interval, Long documentId) {
        log.info("[generateDocumentLink] Service To Generate a Link for Document ID: ${documentId}")

        Document document = Document.get(documentId)
        if (document == null) {
            log.error("Document with ID $documentId not found")
            throw new RuntimeException("Document not found: $documentId")
        }

        Linkable newLinkable = linkableService.createLink(interval)

        newLinkable.document = document;

        // Save the newLinkable
        newLinkable.save();

        return buildLinkableData(newLinkable)
    }

    LinkableData generateFolderLink(Integer interval, Long folderId) {
        log.info("[generateFolderLink] Service To Generate a Link for Folder ID: ${folderId}")

        Folder folder = Folder.get(folderId)
        if (folder == null) {
            log.error("Folder with ID $folderId not found")
            throw new RuntimeException("Folder not found: $folderId")
        }

        Linkable newLinkable = linkableService.createLink(interval)

        newLinkable.folder = folder;

        // Save the newLinkable
        newLinkable.save();

        return buildLinkableData(newLinkable)
    }

    Linkable createLink(Integer interval) {
        log.info("[createTag] Service To Create Linkable")

        // Generate a random unique link using UUID
        String randomLink = UUID.randomUUID().toString()

        // Create a new Linkable instance
        Linkable newLinkable = new Linkable(
                publicLink: randomLink,
                publicLinkExpiration: null,
                folder: null,
                document: null
        );

        // Generate publicLink Limit
        use(TimeCategory) {
            log.info("Calculating expiration date using interval: $interval")
            log.info("Current date: ${new Date()}")
            log.info("Interval days: ${interval.day}")
            newLinkable.publicLinkExpiration = new Date() + interval.day
        }

        return newLinkable
    }

    // Service method to list Links for a specific folder
    List<LinkableData> listFolderLinks(Long folderId) {
        // Log a message indicating the service operation
        log.info("[listFolderLinks] Service To List Links for Folder ID: ${folderId}")

        // Retrieve the folder by ID
        Folder folder = Folder.get(folderId)

        // Retrieve a list of links for the specified folder from the database
        List<Linkable> links = Linkable.findAllByFolder(folder)

        // Sort the links list by id
        links.sort { it.id }

        // Build LinkableData for each Linkable and store them in a list
        List<LinkableData> linkableDataList = links.collect { buildLinkableData(it) }

        return linkableDataList
    }

    // Service method to list Links for a specific document
    List<LinkableData> listDocumentLinks(Long documentId) {
        // Log a message indicating the service operation
        log.info("[listDocumentLinks] Service To List Links for Document ID: ${documentId}")

        // Retrieve the document by ID
        Document document = Document.get(documentId)

        // Retrieve a list of links for the specified document from the database
        List<Linkable> links = Linkable.findAllByDocument(document)

        // Sort the links list by id
        links.sort { it.id }

        // Build LinkableData for each Linkable and store them in a list
        List<LinkableData> linkableDataList = links.collect { buildLinkableData(it) }

        return linkableDataList
    }

    // Service method to delete a Linkable
    void deleteLinkable(Long linkableId) {
        // Check if the tag exists
        Linkable linkable = Linkable.get(linkableId)
        if (linkable == null) {
            throw new IllegalArgumentException("Linkable with id $linkableId does not exist")
        }

        // Delete the linkable
        linkable.delete()
    }

    // A private method to build LinkableData from Linkable
    private static buildLinkableData(Linkable linkable) {
        // Verify if the input linkable is not null
        if (linkable == null) {
            throw new IllegalArgumentException("Linkable is null");
        }

        // Build LinkableData and return it
        return new LinkableData(linkable);
    }

    // Service method to download a folder and its documents or a document based on a public link
    File downloadLinkable(String publicLink) {
        log.info("[downloadLinkable] Service To Download Linkable with Public Link: $publicLink")

        // Retrieve the Linkable by public link
        Linkable linkable = Linkable.findByPublicLink(publicLink)

        if (linkable == null) {
            log.error("Linkable with public link $publicLink not found")
            throw new RuntimeException("Linkable not found for public link: $publicLink")
        }

        // Determine if the Linkable is associated with a folder or document
        if (linkable.folder != null) {
            // Download the folder and its documents
            return downloadFolder(linkable.folder)
        } else if (linkable.document != null) {
            // Download the document
            return downloadDocument(linkable.document)
        } else {
            log.error("Linkable with public link $publicLink is not associated with a folder or document")
            throw new RuntimeException("Invalid Linkable association")
        }
    }

    // Service method to download a folder and its documents
    private File downloadFolder(Folder folder) {
        // Create a temporary directory to store the downloaded files
        Path tempDirectory = Files.createTempDirectory("downloaded_folder")

        // Download each document in the folder
        folder.documents.each { document ->
            downloadDocument(document, tempDirectory)
        }

        // Create a ZIP file containing the downloaded files
        File zipFile = Files.createTempFile("downloaded_folder", ".zip").toFile()
        ZipUtils.zipDirectory(tempDirectory.toFile(), zipFile)

        // Clean up temporary directory
        Files.walk(tempDirectory)
                .sorted(Comparator.reverseOrder())
                .map(Path::toFile)
                .forEach(File::delete)

        return zipFile
    }

    // Service method to download a document
    private File downloadDocument(Document document, Path destinationDirectory = null) {
        // If destinationDirectory is provided, use it; otherwise, create a temporary directory
        Path tempDirectory = destinationDirectory ?: Files.createTempDirectory("downloaded_document")

        // Use the document name as the file name
        String fileName = document.name

        // Create the destination path within the temporary directory
        Path destinationPath = tempDirectory.resolve(fileName)

        // Ensure the destination directory exists
        Files.createDirectories(destinationPath.getParent())

        // Copy the document file to the destination directory
        Files.copy(documentFilePath(document), destinationPath, StandardCopyOption.REPLACE_EXISTING)

        return destinationPath.toFile()
    }


    // Helper method to get the path of the document file on the file system
    private Path documentFilePath(Document document) {
        // Define the base path (C:/filequotacontrol/server)
        Path basePath = Paths.get("C:/filequotacontrol/server");

        // Use the folder name and document name to create corresponding folder and file on the local file system
        Path folderPath = basePath.resolve(document.folder.getUuid());
        return folderPath.resolve(document.getUuid());
    }
}
