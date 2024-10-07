package com.filequotacontrol.app

import groovy.util.logging.Slf4j
import grails.gorm.transactions.Transactional

@Slf4j("log")
@Transactional
class TagAssociationService {

    TagAssociationService tagAssociationService;

    TagAssociationData assignTagDocument(Long tagId, Long documentId) {
        log.info("[assignTagDocument] Service To Assign a Tag to Document ID: ${documentId}")

        Tag tag = Tag.get(tagId)
        if (tag == null) {
            log.error("Tag with ID $tagId not found")
            throw new RuntimeException("Tag not found: $tagId")
        }

        Document document = Document.get(documentId)
        if (document == null) {
            log.error("Document with ID $documentId not found")
            throw new RuntimeException("Document not found: $documentId")
        }

        TagAssociation tagAssociation = tagAssociationService.createTagAssociation()

        tagAssociation.tag = tag;
        tagAssociation.document = document;

        // Save the tagAssociation
        tagAssociation.save();

        return buildTagAssociationData(tagAssociation)
    }

    TagAssociationData assignTagFolder(Long tagId, Long folderId) {
        log.info("[assignTagFolder] Service To Assign a Tag to Folder ID: ${folderId}")

        Tag tag = Tag.get(tagId)
        if (tag == null) {
            log.error("Tag with ID $tagId not found")
            throw new RuntimeException("Tag not found: $tagId")
        }

        Folder folder = Folder.get(folderId)
        if (folder == null) {
            log.error("Folder with ID $folderId not found")
            throw new RuntimeException("Folder not found: $folderId")
        }

        TagAssociation tagAssociation = tagAssociationService.createTagAssociation()

        tagAssociation.tag = tag;
        tagAssociation.folder = folder;

        // Save the tagAssociation
        tagAssociation.save();

        return buildTagAssociationData(tagAssociation)
    }

    TagAssociation createTagAssociation() {
        log.info("[createTag] Service To Create Linkable")

        // Create a new TagAssociation instance
        TagAssociation tagAssociation = new TagAssociation(
                tag: null,
                folder: null,
                document: null
        );

        return tagAssociation
    }

    // Service method to delete a TagAssociation related to a folder
    void deleteTagAssociationForFolder(Long tagId, Long folderId) {
        log.info("[deleteTagAssociationForFolder] Service To Delete TagAssociation for Folder ID: ${folderId}")

        Tag tag = Tag.get(tagId)
        if (tag == null) {
            log.error("Tag with ID $tagId not found")
            throw new RuntimeException("Tag not found: $tagId")
        }

        Folder folder = Folder.get(folderId)
        if (folder == null) {
            log.error("Folder with ID $folderId not found")
            throw new RuntimeException("Folder not found: $folderId")
        }

        // Retrieve the list of tag associations related to the folder
        List<TagAssociation> tagAssociations = TagAssociation.findAllByTagAndFolder(tag, folder)

        // Delete each tag association
        tagAssociations.each { tagAssociation ->
            tagAssociation.delete()
        }
    }

    // Service method to delete a TagAssociation related to a document
    void deleteTagAssociationForDocument(Long tagId, Long documentId) {
        log.info("[deleteTagAssociationForDocument] Service To Delete TagAssociation for Document ID: ${documentId}")

        Tag tag = Tag.get(tagId)
        if (tag == null) {
            log.error("Tag with ID $tagId not found")
            throw new RuntimeException("Tag not found: $tagId")
        }

        Document document = Document.get(documentId)
        if (document == null) {
            log.error("Document with ID $documentId not found")
            throw new RuntimeException("Document not found: $documentId")
        }

        // Retrieve the list of tag associations related to the document
        List<TagAssociation> tagAssociations = TagAssociation.findAllByTagAndDocument(tag, document)

        // Delete each tag association
        tagAssociations.each { tagAssociation ->
            tagAssociation.delete()
        }
    }

    // A private method to build TagAssociationData from TagAssociation
    private static buildTagAssociationData(TagAssociation tagAssociation) {
        // Verify if the input tagAssociation is not null
        if (tagAssociation == null) {
            throw new IllegalArgumentException("TagAssociation is null");
        }

        // Build TagAssociationData and return it
        return new TagAssociationData(tagAssociation);
    }
}
