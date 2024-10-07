package com.filequotacontrol.app

class DocumentData {
    Long documentId
    String name
    String description
    Date creationDate
    String status

    DocumentData() {

    }

    DocumentData(Document document) {
        this.name = document.name
        this.description = document.description
        this.creationDate = document.creationDate
        this.status = document.status
        this.documentId = document.id
    }
}
