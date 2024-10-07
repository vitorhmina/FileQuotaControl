package com.filequotacontrol.app

class UserType {
    Long id
    String userType

    static constraints = {
        userType blank: false, nullable: false, unique: true
    }

    static mapping = {
        table 'USER_TYPE'
        userType column: 'user_type'
        version false
    }
}
