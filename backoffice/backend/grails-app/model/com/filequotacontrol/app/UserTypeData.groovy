package com.filequotacontrol.app

class UserTypeData {
    String userType
    Long userTypeId

    UserTypeData(UserType userType) {
        this.userTypeId = userType.id
        this.userType = userType.userType
    }
}
