package com.filequotacontrol.app

class TagData {
    Long tagId
    String label
    String color
    Long companyId

    TagData() {

    }

    TagData(Tag tag) {
        this.tagId = tag.id
        this.label = tag.label
        this.color = tag.color
        this.companyId = tag.companyId
    }
}
