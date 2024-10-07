package com.filequotacontrol.app

class Tag {
    Long id
    String label
    String color
    Company company

    static constraints = {
        label blank: false, nullable: false
        color blank: false, nullable: false
        company blank: false, nullable: false
    }

    static mapping = {
        table 'TAG'
        label column: 'label'
        color column: 'color'
        company column: 'company_id'
        version false
    }
}
