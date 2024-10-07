package com.filequotacontrol.app

import org.springframework.web.multipart.MultipartFile

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import groovy.util.logging.Slf4j
import grails.gorm.transactions.Transactional

@Slf4j("log")
@Transactional
class DocumentService {

    User loggedInUser = AuthenticationService.getLoggedInUser();

    // Service method to create a Document
    DocumentData createDocument(DocumentData documentData, Long folderId, MultipartFile file) {
        log.info("[createDocument] Service To Create a Document for folder ID: ${folderId}")

        Folder folder = Folder.get(folderId)

        if (folder == null) {
            log.error("Folder with ID $folderId not found")
            throw new RuntimeException("Folder not found: $folderId")
        }

        // Generate a random unique link using UUID
        String uuid = UUID.randomUUID().toString()

        // Create a new Document instance and save it
        Document newDocument = new Document([
                uuid: uuid,
                name: documentData.name,
                description: documentData.description,
                creationDate: new Date(),
                status: 'ACTIVE',
                user: loggedInUser,
                company: folder.company,
                folder: folder
        ]).save();

        // Create corresponding document file on the local file system
        createDocumentFileOnFileSystem(newDocument, file);

        return buildDocumentData(newDocument);
    }

// Method to create document file on the local file system
    private void createDocumentFileOnFileSystem(Document document, MultipartFile file) {
        try {
            // Define the base path (C:/filequotacontrol/server)
            Path basePath = Paths.get("C:/filequotacontrol/server");

            // Use the folder name and document name to create corresponding folder and file on the local file system
            Path folderPath = basePath.resolve(document.folder.getUuid());
            Path documentPath = folderPath.resolve(document.getUuid());

            // Create the folder if it doesn't exist
            if (!Files.exists(folderPath)) {
                Files.createDirectories(folderPath);
            }

            // Create the document file if it doesn't exist
            if (!Files.exists(documentPath)) {
                file.transferTo(documentPath.toFile())
                // You can write content to the file if needed
                // Example: Files.write(documentPath, "Your document content".getBytes());
            }
        } catch (Exception e) {
            log.error("Error creating document file on the file system", e);
            // Handle the exception according to your application's requirements
        }
    }

    // Service method to get Document by ID
    DocumentData getDocumentById(Long documentId) {
        // Log a message indicating the service operation
        log.info("[getDocumentById] Service To Get Document with ID: ${documentId}");


        // Check if the input 'id' is null or less than 1 and throw an exception if it is
        if (documentId == null || documentId < 1) {
            throw new IllegalArgumentException("Invalid ID");
        }

        // Retrieve the Document instance with the given ID from the database
        Document document = Document.get(documentId);

        // Check if the retrieved Document instance is null and throw an exception if it is
        if (document == null) {
            throw new RuntimeException("Document not found");
        }

        // Return the document object
        return buildDocumentData(document);
    }

    List<DocumentData> listDocumentsByFolder(Long folderId) {
        // Log a message indicating the service operation
        log.info("[listDocumentsByFolder] Service To List ACTIVE Documents for Folder ID: ${folderId}")

        // Retrieve the folder by ID
        Folder folder = Folder.get(folderId)

        // Retrieve a list of ACTIVE documents for the specified folder from the database
        List<Document> documents = Document.findAllByFolderAndStatus(folder, 'ACTIVE')

        // Sort the documents list by id
        documents.sort { it.id }

        // Build DocumentData for each document and store them in a list
        List<DocumentData> documentDataList = documents.collect { buildDocumentData(it) }

        return documentDataList
    }

    List<DocumentData> listDeletedDocumentsByFolder(Long folderId) {
        // Log a message indicating the service operation
        log.info("[listDeletedDocumentsByFolder] Service To List DELETED Documents for Folder ID: ${folderId}")

        // Retrieve the folder by ID
        Folder folder = Folder.get(folderId)

        // Retrieve a list of ACTIVE documents for the specified folder from the database
        List<Document> documents = Document.findAllByFolderAndStatus(folder, 'DELETED')

        // Sort the documents list by id
        documents.sort { it.id }

        // Build DocumentData for each document and store them in a list
        List<DocumentData> documentDataList = documents.collect { buildDocumentData(it) }

        return documentDataList
    }

    // Service method to update a Document's attributes
    DocumentData updateDocument(Long documentId, DocumentData documentData) {
        log.info("[updateDocument] Service To Update Document with ID: ${documentId}")

        // Check if the document exists
        Document document = Document.get(documentId)
        if (document == null) {
            throw new IllegalArgumentException("Document with id $documentId does not exist")
        }

        // Update the document
        document.name = documentData.name
        document.description = documentData.description
        document.save(flush: true)

        // Return the updated DocumentData
        return buildDocumentData(document)
    }

    // Service method to move a Document to a new parent Folder
    DocumentData moveDocument(Long documentId, Long newFolderId) {
        log.info("[moveDocument] Service To Move Document with ID: ${documentId} to New Parent Folder ID: ${newFolderId}")

        // Check if the document exists
        Document document = Document.get(documentId)
        if (document == null) {
            throw new IllegalArgumentException("Document with id $documentId does not exist")
        }

        // Check if the newFolder exists
        Folder newfolder = Folder.get(newFolderId)
        if (newfolder == null) {
            throw new IllegalArgumentException("Folder with id $newFolderId does not exist")
        }

        // Update the document
        document.folder = newfolder
        document.save(flush: true)

        // Return the updated DocumentData
        return buildDocumentData(document)
    }

    // Service method to delete a Document by updating its status
    void deleteDocument(Long documentId) {
        // Log a message indicating the service operation
        log.info("[deleteDocument] Service To Delete Document with ID: ${documentId}")

        // Retrieve the Document instance with the given ID from the database
        Document document = Document.get(documentId)

        // Check if the retrieved Document instance is null and throw an exception if it is
        if (document == null) {
            throw new RuntimeException("Document not found");
        }

        // Retrieve the list of tag associations related to the document
        List<TagAssociation> tagAssociations = TagAssociation.findAllByDocument(document)

        // Delete each tag association
        tagAssociations.each { tagAssociation ->
            tagAssociation.delete()
        }

        // Update the status of the document to "DELETED"
        document.status = 'DELETED'
        document.save()
    }

    // A private method to build DocumentData from Document
    private static buildDocumentData(Document document) {
        // Verify if the input document is not null
        if (document == null) {
            throw new IllegalArgumentException("Document is null");
        }

        // Build DocumentData and return it
        return new DocumentData(document);
    }
}
