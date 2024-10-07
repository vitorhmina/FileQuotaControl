package com.filequotacontrol.app

class UserCompanyData {
    Long userCompanyId
    String role
    String username
    String companyName
    Long userId

    UserCompanyData(UserCompany userCompany) {
        this.role = userCompany.role
        this.userCompanyId = userCompany.id
    }
}