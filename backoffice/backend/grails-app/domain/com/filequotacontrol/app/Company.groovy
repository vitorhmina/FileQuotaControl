package com.filequotacontrol.app

class Company {
    Long id
    String title
    Integer quota

    static constraints = {
        title blank: false, nullable: false, unique: true
        quota blank: false, nullable: false
    }

    static mapping = {
        table 'COMPANY'
        title column: 'title'
        quota column: 'quota'
        version false
    }
}