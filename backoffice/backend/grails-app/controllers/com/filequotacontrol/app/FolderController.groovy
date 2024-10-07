package com.filequotacontrol.app

import grails.converters.JSON
import groovy.util.logging.Slf4j

@Slf4j("log")
class FolderController {

    FolderService folderService

    /**
     * Controller method to create a new Folder.
     * Expects JSON: { 'name', 'companyId', 'folderId' }
     * Returns the created FolderData as JSON.
     */
    def createFolder() {
        def requestData = request.getJSON() as Map
        FolderData folderData = new FolderData(
                name: requestData.name
        )

        Long companyId = requestData.companyId
        Long folderId = requestData.folderId

        log.info("[createFolder] Controller method called with companyId: $companyId, folderId: $folderId")

        // Call the FolderService to create a new Folder
        FolderData result = folderService.createFolder(folderData, companyId, folderId)

        // Render the result as JSON
        render(result as JSON)
    }

    /**
     * Controller method to retrieve FolderData by ID.
     * Path parameter: 'folderId'.
     * Returns FolderData as JSON.
     */
    def getFolderById() {
        Long folderId = params.folderId as Long

        log.info("[getFolderById] Controller method called with folderId: $folderId")

        // Call the FolderService to get FolderData by ID
        FolderData folderData = folderService.getFolderById(folderId)

        // Render the FolderData as JSON
        render(folderData as JSON)
    }

    /**
     * Controller method to retrieve a list of Folders for a specified company.
     * Path parameter: 'companyId'.
     * Returns a list of Folders as JSON.
     */
    def listCompanyFolders() {
        Long companyId = params.companyId as Long

        log.info("[listCompanyFolders] Controller method called with companyId: $companyId")

        // Call the FolderService to retrieve a list of folders for the specified company
        List<FolderData> folders = folderService.listFoldersByCompany(companyId)

        // Render the list of folders as JSON
        render(folders as JSON)
    }

    /**
     * Controller method to retrieve a list of deleted Folders for a specified Folder.
     * Path parameter: 'folderId'.
     * Returns a list of deleted Folders as JSON.
     */
    def listCompanyDeletedFolders() {
        Long folderId = params.folderId as Long

        log.info("[listCompanyDeletedFolders] Controller method called with folderId: $folderId")

        // Call the FolderService to retrieve a list of deleted folders for the specified company
        List<FolderData> folders = folderService.listDeletedFoldersByFolder(folderId)

        // Render the list of folders as JSON
        render(folders as JSON)
    }

    /**
     * Controller method to update the name of a Folder.
     * Expects JSON: { 'newName' }.
     * Returns the updated FolderData as JSON.
     */
    def updateFolderName() {
        def requestData = request.getJSON() as Map
        Long folderId = params.folderId as Long
        String newName = requestData.newName

        log.info("[updateFolderName] Controller method called with folderId: $folderId, newName: $newName")

        // Call the FolderService to update the folder name
        FolderData folderData = folderService.updateFolderName(folderId, newName)

        // Render the updated FolderData as JSON
        render(folderData as JSON)
    }

    /**
     * Controller method to update the folder location.
     * Expects JSON: { 'newFolderId' }.
     * Returns the updated FolderData as JSON.
     */
    def moveFolder() {
        def requestData = request.getJSON() as Map
        Long folderId = params.folderId as Long
        Long newFolderId = requestData.newFolderId

        log.info("[moveFolder] Controller method called with folderId: $folderId, newFolderId: $newFolderId")

        // Call the FolderService to update the folder location
        FolderData folderData = folderService.moveFolder(folderId, newFolderId)

        // Render the updated FolderData as JSON
        render(folderData as JSON)
    }

    /**
     * Controller method to delete a Folder by updating its status.
     * Path parameter: 'folderId'.
     * Responds with a success message upon deletion.
     */
    def deleteFolder() {
        Long folderId = params.folderId as Long

        log.info("[deleteFolder] Controller method called with folderId: $folderId")

        // Call the FolderService to delete the folder
        FolderData folderData = folderService.deleteFolder(folderId)

        // Respond with success
        render([message: "Folder deleted successfully"] as JSON)
    }
}
