package com.filequotacontrol.app

class FolderData {
    Long folderId
    String name
    Date creationDate
    String status
    Long companyId

    FolderData() {

    }

    FolderData(Folder folder) {
        this.name = folder.name
        this.creationDate = folder.creationDate
        this.status = folder.status
        this.companyId = folder.companyId
        this.folderId = folder.id
    }
}
