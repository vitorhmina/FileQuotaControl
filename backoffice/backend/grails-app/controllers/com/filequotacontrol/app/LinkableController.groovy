package com.filequotacontrol.app

import grails.converters.JSON
import groovy.util.logging.Slf4j

import javax.servlet.http.HttpServletResponse

@Slf4j("log")
class LinkableController {

    LinkableService linkableService;

    // Controller method to generate a link for a document
    def generateDocumentLink() {
        def requestData = request.getJSON() as Map

        Integer interval = requestData.interval
        Long documentId = requestData.documentId

        LinkableData result = linkableService.generateDocumentLink(interval, documentId)
        render(result as JSON)
    }

    // Controller method to generate a link for a folder
    def generateFolderLink() {
        def requestData = request.getJSON() as Map

        Integer interval = requestData.interval
        Long folderId = requestData.folderId

        LinkableData result = linkableService.generateFolderLink(interval, folderId)
        render(result as JSON)
    }

    def listFolderLinks() {
        Long folderId = params.getLong('folderId')

        // Call the LinkableService to retrieve a list of linkables for the specified folder
        List<LinkableData> links = linkableService.listFolderLinks(folderId)

        // Render the list of links as JSON
        render(links as JSON)
    }

    def listDocumentLinks() {
        Long documentId = params.getLong('documentId')

        // Call the LinkableService to retrieve a list of linkables for the specified document
        List<LinkableData> links = linkableService.listDocumentLinks(documentId)

        // Render the list of links as JSON
        render(links as JSON)
    }

    // Controller method to download a folder or document based on the public link
    def downloadLinkable() {
        String publicLink = params.publicLink

        File downloadedFile = linkableService.downloadLinkable(publicLink)

        response.setHeader('Content-Disposition', "attachment; filename=${downloadedFile.name}")
        response.outputStream << downloadedFile.bytes

    }
}
