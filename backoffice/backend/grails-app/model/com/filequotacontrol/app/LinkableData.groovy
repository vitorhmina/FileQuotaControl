package com.filequotacontrol.app

class LinkableData {
    String publicLink
    Date publicLinkExpiration

    LinkableData(Linkable linkable) {
        this.publicLink = linkable.publicLink
        this.publicLinkExpiration = linkable.publicLinkExpiration
    }
}
