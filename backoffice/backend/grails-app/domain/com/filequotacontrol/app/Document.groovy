package com.filequotacontrol.app

class Document {
    Long id
    String uuid
    String name
    String description
    Date creationDate
    String status
    User user
    Company company
    Folder folder

    static constraints = {
        uuid blank: false, nullable: false
        name blank: false, nullable: false
        description nullable: true
        creationDate blank: false, nullable: false
        status blank: false, nullable: false
        user blank: false, nullable: false
        company blank: false, nullable: false
        folder nullable: true
    }

    static mapping = {
        table 'DOCUMENT'
        title column: 'title'
        description column: 'description'
        creationDate column: 'creation_date'
        status column: 'status'
        userId column: 'user_id'
        companyId column: 'company_id'
        folderId column: 'folder_id'
        version false
    }
}
