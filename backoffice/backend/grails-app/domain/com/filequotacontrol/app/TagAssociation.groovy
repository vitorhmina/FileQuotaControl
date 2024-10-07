package com.filequotacontrol.app

class TagAssociation {
    Long id
    Tag tag
    Folder folder
    Document document


    static constraints = {
        folder nullable: true
        document nullable: true
        tag blank: false, nullable: false
    }

    static mapping = {
        table 'TAG_ASSOCIATION'
        tag column: 'tag_id'
        folder column: 'folder_id'
        document column: 'document_id'
        version false
    }
}
