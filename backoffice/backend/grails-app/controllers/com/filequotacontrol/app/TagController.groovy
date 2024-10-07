package com.filequotacontrol.app

import grails.converters.JSON
import groovy.util.logging.Slf4j

@Slf4j("log")
class TagController {

    TagService tagService

    /**
     * Controller method to create a new Tag for a specified company.
     * Expects JSON: { 'label', 'color', 'companyId' }.
     * Returns the created TagData as JSON.
     */
    def createTag() {
        def requestData = request.getJSON() as Map
        TagData tagData = new TagData(
                label: requestData.label,
                color: requestData.color
        )

        Long companyId = requestData.companyId

        TagData result = tagService.createTag(tagData, companyId)
        render(result as JSON)
    }

    /**
     * Controller method to retrieve TagData by ID.
     * Path parameter: 'tagId'.
     * Returns TagData as JSON.
     */
    def getTagById() {
        Long tagId = params.tagId as Long

        log.info("[getTagById] Controller method called with tagId: $tagId")

        // Call the TagService to get TagData by ID
        TagData tagData = tagService.getTagById(tagId)

        // Render the TagData as JSON
        render(tagData as JSON)
    }

    /**
     * Controller method to retrieve a list of all Tags.
     * Returns a list of TagData as JSON.
     */
    def listTags() {
        // Call the TagService to retrieve a list of all tags
        List<TagData> tags = tagService.listTags()

        // Render the list of tags as JSON
        render(tags as JSON)
    }

    /**
     * Controller method to retrieve a list of Tags for a specified company.
     * Path parameter: 'companyId'.
     * Returns a list of TagData as JSON.
     */
    def listCompanyTags() {
        Long companyId = params.getLong('companyId')

        log.info("[listCompanyTags] Controller method called with companyId: $companyId")

        // Call the TagService to retrieve a list of tags for the specified company
        List<TagData> tags = tagService.listCompanyTags(companyId)

        // Render the list of tags as JSON
        render(tags as JSON)
    }

    /**
     * Controller method to list tags associated with a folder.
     * Path parameter: 'folderId'.
     * Returns a list of TagData as JSON.
     */
    def listFolderTags() {
        Long folderId = params.getLong('folderId')

        log.info("[listFolderTags] Controller method called with folderId: $folderId")

        // Call the TagService to retrieve a list of tags associated with the folder
        List<TagData> tags = tagService.listFolderTags(folderId)

        // Render the list of tags as JSON
        render(tags as JSON)
    }

    /**
     * Controller method to list tags associated with a document.
     * Path parameter: 'documentId'.
     * Returns a list of TagData as JSON.
     */
    def listDocumentTags() {
        Long documentId = params.getLong('documentId')

        log.info("[listDocumentTags] Controller method called with documentId: $documentId")

        // Call the TagService to retrieve a list of tags associated with the document
        List<TagData> tags = tagService.listDocumentTags(documentId)

        // Render the list of tags as JSON
        render(tags as JSON)
    }

    /**
     * Controller method to update a Tag.
     * Expects JSON: { 'label', 'color' }.
     * Path parameter: 'tagId'.
     * Returns the updated TagData as JSON.
     */
    def updateTag() {
        def requestData = request.getJSON() as Map
        Long tagId = params.tagId as Long
        TagData tagData = new TagData(
                label: requestData.label,
                color: requestData.color
        )

        log.info("[updateTag] Controller method called with tagId: $tagId")

        // Call the TagService to update a tag
        TagData result = tagService.updateTag(tagId, tagData)

        // Render the updated result as JSON
        render(result as JSON)
    }

    /**
     * Controller method to delete a Tag by ID.
     * Path parameter: 'tagId'.
     * Responds with a success message upon deletion.
     */
    def deleteTag() {
        Long tagId = params.tagId as Long

        log.info("[deleteTag] Controller method called with tagId: $tagId")

        // Call the TagService to delete the tag
        TagData tagData = tagService.deleteTag(tagId)

        // Respond with success
        render([message: "Tag deleted successfully"] as JSON)
    }
}
