package com.filequotacontrol.app

import grails.converters.JSON
import groovy.util.logging.Slf4j

@Slf4j("log")
class TagAssociationController {

    TagAssociationService tagAssociationService;

    /**
     * Controller method to assign a tag to a folder.
     * Expects JSON: { 'tagId', 'folderId' }.
     * Returns the created TagAssociationData as JSON.
     */
    def assignTagFolder() {
        def requestData = request.getJSON() as Map

        Long tagId = requestData.tagId
        Long folderId = requestData.folderId

        TagAssociationData result = tagAssociationService.assignTagFolder(tagId, folderId)
        render(result as JSON)
    }

    /**
     * Controller method to assign a tag to a document.
     * Expects JSON: { 'tagId', 'documentId' }.
     * Returns the created TagAssociationData as JSON.
     */
    def assignTagDocument() {
        def requestData = request.getJSON() as Map

        Long tagId = requestData.tagId
        Long documentId = requestData.documentId

        TagAssociationData result = tagAssociationService.assignTagDocument(tagId, documentId)
        render(result as JSON)
    }

    /**
     * Controller method to delete a tag association with a folder.
     * Expects JSON: { 'tagId', 'folderId' }.
     * Responds with a success message upon deletion.
     */
    def unassignTagFromFolder() {
        def requestData = request.getJSON() as Map

        Long tagId = requestData.tagId
        Long folderId = requestData.folderId

        // Call the TagAssociationService to delete the tag association with a folder
        tagAssociationService.deleteTagAssociationForFolder(tagId, folderId)

        // Respond with success
        render([message: "Tag association with folder deleted successfully"] as JSON)
    }

    /**
     * Controller method to delete a tag association with a document.
     * Expects JSON: { 'tagId', 'documentId' }.
     * Responds with a success message upon deletion.
     */
    def unassignTagFromDocument() {
        def requestData = request.getJSON() as Map

        Long tagId = requestData.tagId
        Long documentId = requestData.documentId

        // Call the TagAssociationService to delete the tag association with a document
        tagAssociationService.deleteTagAssociationForDocument(tagId, documentId)

        // Respond with success
        render([message: "Tag association with document deleted successfully"] as JSON)
    }
}
