package com.filequotacontrol.app

import grails.converters.JSON
import groovy.util.logging.Slf4j
import groovyx.gpars.csp.plugAndPlay.GConsole
import org.springframework.web.multipart.MultipartFile

@Slf4j("log")
class DocumentController {

    DocumentService documentService;

    /**
     * Controller method to create a new Document.
     * Expects JSON: { 'name', 'description', 'folderId' }
     * Returns the created DocumentData as JSON.
     */
    def createDocument() {
        def requestData = request.getJSON() as Map
        DocumentData documentData = new DocumentData(
                name: requestData.name,
                description: requestData.description
        )

        Long folderId = requestData.folderId

        // Retrieve the file from the request
        MultipartFile file = request.getFile('file')

        log.info("[createDocument] Created Document in Folder ID: ${folderId}")

        // Call the DocumentService to create a new Document
        DocumentData result = documentService.createDocument(documentData, folderId, file)

        // Render the result as JSON
        render(result as JSON)
    }

    /**
     * Controller method to retrieve DocumentData by ID.
     * Path parameter: 'documentId'.
     * Returns DocumentData as JSON.
     */
    def getDocumentById() {
        Long documentId = params.documentId as Long

        log.info("[getDocumentById] Retrieving Document with ID: ${documentId}")

        // Call the DocumentService to get DocumentData by ID
        DocumentData documentData = documentService.getDocumentById(documentId)

        // Render the DocumentData as JSON
        render(documentData as JSON)
    }

    /**
     * Controller method to retrieve a list of Documents for a specified folder.
     * Path parameter: 'folderId'.
     * Returns a list of Documents as JSON.
     */
    def listFolderDocuments() {
        Long folderId = params.folderId as Long

        log.info("[listFolderDocuments] Listing Documents for Folder ID: ${folderId}")

        // Call the DocumentService to retrieve a list of documents for the specified folder
        List<DocumentData> documents = documentService.listDocumentsByFolder(folderId)

        // Render the list of documents as JSON
        render(documents as JSON)
    }

    /**
     * Controller method to retrieve a list of deleted Documents for a specified folder.
     * Path parameter: 'folderId'.
     * Returns a list of deleted Documents as JSON.
     */
    def listFolderDeletedDocuments() {
        Long folderId = params.folderId as Long

        log.info("[listFolderDeletedDocuments] List Deleted Documents for Folder ID: ${folderId}")

        // Call the DocumentService to retrieve a list of deleted documents for the specified folder
        List<DocumentData> documents = documentService.listDeletedDocumentsByFolder(folderId)

        // Render the list of documents as JSON
        render(documents as JSON)
    }

    /**
     * Controller method to update a Document.
     * Expects JSON: { 'name', 'description' }.
     * Path parameter: 'documentId'.
     * Returns the updated DocumentData as JSON.
     */
    def updateDocument() {
        def requestData = request.getJSON() as Map
        Long documentId = params.documentId as Long
        DocumentData documentData = new DocumentData(
                name: requestData.newName,
                description: requestData.newDescription
        )

        log.info("[updateDocument] Controller method called with documentId: $documentId")

        // Call the DocumentService to update a document
        DocumentData result = documentService.updateDocument(documentId, documentData)

        // Render the updated result as JSON
        render(result as JSON)
    }

    /**
     * Controller method to update the folder location.
     * Expects JSON: { 'newFolderId' }.
     * Returns the updated FolderData as JSON.
     */
    def moveDocument() {
        def requestData = request.getJSON() as Map
        Long documentId = params.documentId as Long
        Long newFolderId = requestData.newFolderId

        log.info("[moveDocument] Controller method called with documentId: $documentId, newFolderId: $newFolderId")

        // Call the DocumentService to update the document location
        DocumentData documentData = documentService.moveDocument(documentId, newFolderId)

        // Render the updated DocumentData as JSON
        render(documentData as JSON)
    }

    /**
     * Controller method to delete a Document by updating its status.
     * Path parameter: 'documentId'.
     * Responds with a success message upon deletion.
     */
    def deleteDocument() {
        Long documentId = params.documentId as Long

        log.info("[deleteDocument] Deleting Document with ID: ${documentId}")

        // Call the DocumentService to delete the document
        DocumentData documentData = documentService.deleteDocument(documentId)

        // Respond with success
        render([message: "Document deleted successfully"] as JSON)
    }
}
