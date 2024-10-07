package com.filequotacontrol.app

class Linkable {
    Long id
    String publicLink
    Date publicLinkExpiration
    Document document
    Folder folder

    static constraints = {
        publicLink blank: false, nullable: false
        publicLinkExpiration blank: false, nullable: false
        document nullable: true
        folder nullable: true
    }

    static mapping = {
        table 'LINKABLE'
        publicLink column: 'public_link'
        publicLinkExpiration column: 'public_link_expiration'
        document column: 'document_id'
        folder column: 'folder_id'
        version false
    }
}
