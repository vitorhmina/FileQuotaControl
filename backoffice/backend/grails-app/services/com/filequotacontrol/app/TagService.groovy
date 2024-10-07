package com.filequotacontrol.app

import groovy.util.logging.Slf4j
import grails.gorm.transactions.Transactional

@Slf4j("log")
@Transactional
class TagService {

    CompanyService companyService;

    // Service method to create a Tag
    TagData createTag(TagData tagData, Long companyId) {
        log.info("[createTag] Service To Create Tag for Company ID: ${companyId}")

        Company company = Company.get(companyId)
        if (company == null) {
            log.error("Company with ID $companyId not found")
            throw new RuntimeException("Company not found: $companyId")
        }

        // Create a new Tag instance and save it
        Tag newTag = new Tag([
                label: tagData.label,
                color: tagData.color,
                company: company
        ]).save();

        return buildTagData(newTag)
    }

    // Service method to get Tag by ID
    TagData getTagById(Long tagId) {
        // Log a message indicating the service operation
        log.info("[getTagById] Service To Get Tag with ID: ${tagId}");

        // Check if the input 'tagId' is null or less than 1 and throw an exception if it is
        if (tagId == null || tagId < 1) {
            throw new IllegalArgumentException("Invalid ID");
        }

        // Retrieve the Tag instance with the given tagId from the database
        Tag tag = Tag.get(tagId);

        // Check if the retrieved Tag instance is null and throw an exception if it is
        if (tag == null) {
            throw new RuntimeException("Tag not found");
        }

        // Return the tagData
        return buildTagData(tag);
    }

    // Service method to list Tags
    List<TagData> listTags() {
        // Log a message indicating the service operation
        log.info("[listTags] Service To List Tags")

        // Retrieve a list of all tags from the database
        List<Tag> tags = Tag.list()

        // Sort the tags list by id
        tags.sort { it.id }

        // Build TagData for each Tag and store them in a list
        List<TagData> tagDataList = tags.collect { buildTagData(it) }

        return tagDataList
    }

    // Service method to list Tags for a specific company
    List<TagData> listCompanyTags(Long companyId) {
        // Log a message indicating the service operation
        log.info("[listCompanyTags] Service To List Tags for Company ID: ${companyId}")

        // Retrieve the company by ID
        Company company = Company.get(companyId)

        // Retrieve a list of tags for the specified company from the database
        List<Tag> tags = Tag.findAllByCompany(company)

        // Sort the tags list by id
        tags.sort { it.id }

        // Build TagData for each Tag and store them in a list
        List<TagData> tagDataList = tags.collect { buildTagData(it) }

        return tagDataList
    }

    // Service method to list tags associated with a folder
    List<TagData> listFolderTags(Long folderId) {
        log.info("[listFolderTags] Service To List Tags for Folder ID: ${folderId}")

        Folder folder = Folder.get(folderId)
        if (folder == null) {
            log.error("Folder with ID $folderId not found")
            throw new RuntimeException("Folder not found: $folderId")
        }

        // Retrieve the list of tag associations related to the folder
        List<TagAssociation> tagAssociations = TagAssociation.findAllByFolder(folder)

        // Build TagData for each tag associated with the folder and store them in a list
        List<TagData> tagDataList = tagAssociations.collect { buildTagData(it.tag) }

        return tagDataList
    }

    // Service method to list tags associated with a document
    List<TagData> listDocumentTags(Long documentId) {
        log.info("[listDocumentTags] Service To List Tags for Document ID: ${documentId}")

        Document document = Document.get(documentId)
        if (document == null) {
            log.error("Document with ID $documentId not found")
            throw new RuntimeException("Document not found: $documentId")
        }

        // Retrieve the list of tag associations related to the document
        List<TagAssociation> tagAssociations = TagAssociation.findAllByDocument(document)

        // Build TagData for each tag associated with the document and store them in a list
        List<TagData> tagDataList = tagAssociations.collect { buildTagData(it.tag) }

        return tagDataList
    }

    // Service method to update a Tag's attributes
    TagData updateTag(Long tagId, TagData tagData) {
        log.info("[updateTag] Service To Update Tag with ID: ${tagId}")

        // Check if the tag exists
        Tag tag = Tag.get(tagId)
        if (tag == null) {
            throw new IllegalArgumentException("Tag with id $tagId does not exist")
        }

        // Update the tag
        tag.label = tagData.label
        tag.color = tagData.color
        tag.save(flush: true)

        // Return the updated TagData
        return buildTagData(tag)
    }

    // Service method to delete a Tag
    void deleteTag(Long tagId) {
        // Log a message indicating the service operation
        log.info("[deleteTag] Service To Delete Tag with ID: ${tagId}")

        // Retrieve the Tag instance with the given ID from the database
        Tag tag = Tag.get(tagId)

        // Check if the retrieved Tag instance is null and throw an exception if it is
        if (tag == null) {
            throw new RuntimeException("Tag not found");
        }

        // Retrieve the list of tag associations
        List<TagAssociation> tagAssociations = TagAssociation.findAllByTag(tag)

        // Loop through tag associations
        tagAssociations.each { tagAssociation ->

            // Delete the tags associated to the deleted tag
            tagAssociation.delete()
        }

        // Delete the selected tag
        tag.delete()
    }

    // A private method to build TagData from Tag
    private static buildTagData(Tag tag) {
        // Verify if the input tag is not null
        if (tag == null) {
            throw new IllegalArgumentException("Tag is null");
        }

        // Build TagData and return it
        return new TagData(tag);
    }
}
