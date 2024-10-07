package com.filequotacontrol.app

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import groovy.util.logging.Slf4j
import grails.gorm.transactions.Transactional

@Slf4j("log")
@Transactional
class FolderService {

    User loggedInUser = AuthenticationService.getLoggedInUser();

    // Service method to create a Folder
    FolderData createFolder(FolderData folderData, Long companyId, Long folderId) {
        log.info("[createFolder] Service To Create a Folder for Company ID: ${companyId} in Folder ID: ${folderId}")

        // Retrieve the company by ID
        Company company = Company.get(companyId)

        // Check if the company exists
        if (company == null) {
            log.error("Company with ID $companyId not found")
            throw new RuntimeException("Company not found: $companyId")
        }

        Folder folder = null
        if (folderId) {
            folder = Folder.get(folderId)

            if (folder == null || folder.company.id != companyId) {
                log.error("Parent folder with ID $folderId not found in the specified company")
                throw new RuntimeException("Invalid parent folder: $folderId")
            }
        }

        // Generate a random unique link using UUID
        String uuid = UUID.randomUUID().toString()

        // Create a new Folder instance and save it
        Folder newFolder = new Folder([
                uuid: uuid,
                name: folderData.name,
                creationDate: new Date(),
                status: 'ACTIVE',
                user: loggedInUser,
                company: company,
                folder: folder,
        ]).save()

        // Create corresponding folder on the local file system
        createFolderOnFileSystem(newFolder)

        // Return the folder object
        return buildFolderData(newFolder)
    }

    // Method to create folder on the local file system
    private void createFolderOnFileSystem(Folder folder) {
        try {
            // Define the base path (C:/filequotacontrol/server)
            Path basePath = Paths.get("C:/filequotacontrol/server");

            // Use the name property of the folder to create a corresponding folder on the local file system
            Path folderPath = basePath.resolve(folder.getUuid());

            // Create the folder if it doesn't exist
            if (!Files.exists(folderPath)) {
                Files.createDirectories(folderPath);
            }
        } catch (Exception e) {
            log.error("Error creating folder on the file system", e);
            // Handle the exception according to your application's requirements
        }
    }

    // Service method to get Folder by ID
    FolderData getFolderById(Long folderId) {
        // Log a message indicating the service operation
        log.info("[getFolderById] Service To Get Folder with ID: ${folderId}");

        // Check if the input 'folderId' is null or less than 1 and throw an exception if it is
        if (folderId == null || folderId < 1) {
            throw new IllegalArgumentException("Invalid ID");
        }

        // Retrieve the Folder instance with the given ID from the database
        Folder folder = Folder.get(folderId);

        // Check if the retrieved Folder instance is null and throw an exception if it is
        if (folder == null) {
            throw new RuntimeException("Folder not found");
        }

        // Return the folder object
        return buildFolderData(folder);
    }

    // Service method to list active Folders by Company
    List<FolderData> listFoldersByCompany(Long companyId) {
        // Log a message indicating the service operation
        log.info("[listFoldersByCompany] Service To List ACTIVE Folders for Company ID: ${companyId}")

        // Retrieve the company by ID
        Company company = Company.get(companyId)

        // Retrieve a list of active folders for the specified company from the database
        List<Folder> activeFolders = Folder.findAllByCompanyAndStatus(company, 'ACTIVE')

        // Sort the folders list by id
        activeFolders.sort { it.id }

        // Build FolderData for each Folder and store them in a list
        List<FolderData> folderDataList = activeFolders.collect { buildFolderData(it) }

        return folderDataList
    }

    // Service method to list deleted Folders by Parent Folder
    List<FolderData> listDeletedFoldersByFolder(Long folderId) {
        // Log a message indicating the service operation
        log.info("[listDeletedFoldersByFolder] Service To List DELETED Folders for Folder ID: ${folderId}")

        // Retrieve the folder by ID
        Folder folder = Folder.get(folderId)

        // Retrieve a list of ACTIVE folders for the specified folder from the database
        List<Folder> folders = Folder.findAllByFolderAndStatus(folder, 'DELETED')

        // Sort the folders list by id
        folders.sort { it.id }

        // Build FolderData for each folder and store them in a list
        List<FolderData> folderDataList = folders.collect { buildFolderData(it) }

        return folderDataList
    }

    // Service method to update a Folder's name
    FolderData updateFolderName(Long folderId, String name) {
        log.info("[updateFolderName] Service To Update Folder Name with ID: ${folderId}")

        // Check if the folder exists
        Folder folder = Folder.get(folderId)
        if (folder == null) {
            throw new IllegalArgumentException("Folder with id $folderId does not exist")
        }

        // Update the folder
        folder.name = name
        folder.save(flush: true)

        // Return the updated FolderData
        return buildFolderData(folder)
    }

    // Service method to move a Folder to a new parent Folder
    FolderData moveFolder(Long folderId, Long newFolderId) {
        log.info("[moveFolder] Service To Move Folder with ID: ${folderId} to New Parent Folder ID: ${newFolderId}")

        // Check if the folder exists
        Folder folder = Folder.get(folderId)
        if (folder == null) {
            throw new IllegalArgumentException("Folder with id $folderId does not exist")
        }

        // Check if the newFolder exists
        Folder newfolder = Folder.get(newFolderId)
        if (folder == null) {
            throw new IllegalArgumentException("Folder with id $folderId does not exist")
        }

        // Update the folder
        folder.folder = newfolder
        folder.save(flush: true)

        // Return the updated FolderData
        return buildFolderData(folder)
    }

    // Service method to delete a Folder by updating its status
    void deleteFolder(Long folderId) {
        // Log a message indicating the service operation
        log.info("[deleteFolder] Service To Delete Folder with ID: ${folderId}")

        // Retrieve the Folder instance with the given ID from the database
        Folder folder = Folder.get(folderId)

        // Check if the retrieved Folder instance is null and throw an exception if it is
        if (folder == null) {
            throw new RuntimeException("Folder not found");
        }

        // Update the status of the folder to "DELETED"
        folder.status = 'DELETED'
        folder.save()

        // Retrieve the list of documents contained in the folder
        List<Document> documents = Document.findAllByFolder(folder)

        // Update the status of each document to "DELETED"
        documents.each { document ->
            document.status = 'DELETED'
            document.save()
        }

        // Retrieve the list of tag associations related to the folder
        List<TagAssociation> tagAssociations = TagAssociation.findAllByFolder(folder)

        // Delete each tag association
        tagAssociations.each { tagAssociation ->
            tagAssociation.delete()
        }
    }

    // A private method to build FolderData from Folder
    private static buildFolderData(Folder folder) {
        // Verify if the input folder is not null
        if (folder == null) {
            throw new IllegalArgumentException("Folder is null");
        }

        // Build FolderData and return it
        return new FolderData(folder);
    }
}
