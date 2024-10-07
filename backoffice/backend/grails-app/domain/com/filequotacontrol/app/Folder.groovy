package com.filequotacontrol.app

class Folder {
    Long id
    String uuid
    String name
    Date creationDate
    String status
    User user
    Company company
    Folder folder

    static constraints = {
        uuid blank: false, nullable: false
        name blank: false, nullable: false
        creationDate blank: false, nullable: false
        status blank: false, nullable: false
        user blank: false, nullable: false
        company blank: false, nullable: false
        folder blank: true, nullable: true
    }

    static mapping = {
        table 'FOLDER'
        name column: 'name'
        creationDate column: 'creation_date'
        status column: 'status'
        user column: 'user_id'
        company column: 'company_id'
        folder column: 'folder_id'
        version false
    }
}
