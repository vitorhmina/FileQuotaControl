package com.filequotacontrol.app

class CompanyData {
    String title
    Integer quota
    Long companyId

    CompanyData() {

    }

    CompanyData(Company company) {
        this.title = company.title
        this.quota = company.quota
        this.companyId = company.id
    }
}
