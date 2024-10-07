package com.filequotacontrol.app

class UserCompany {
    Long id
    String role
    User user
    Company company

    static constraints = {
        role blank: false, nullable: false
        user blank: false, nullable: false
        company blank: false, nullable: false
    }

    static mapping = {
        table 'USER_COMPANY'
        role column: 'role'
        user column: 'user_id'
        company column: 'company_id'
        version false
    }
}
