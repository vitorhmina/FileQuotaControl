package com.filequotacontrol.app

import grails.converters.JSON
import groovy.util.logging.Slf4j

@Slf4j("log")
class CompanyController {

    CompanyService companyService

    /**
     * Controller method to register a new company.
     * Expects JSON: { 'title' }.
     * Returns the registered CompanyData as JSON.
     */
    def registerCompany() {
        // Log a message indicating the controller method called
        log.info("[registerCompany] Controller method called")

        // Extract company data from the request
        Map requestData = request.getJSON() as Map
        CompanyData companyData = new CompanyData(
                title: requestData.title
        )

        // Call the CompanyService to register a new company
        CompanyData result = companyService.registerCompany(companyData)

        // Render the registered company data as JSON
        render(result as JSON)
    }

    /**
     * Controller method to register a new company.
     * Expects JSON: { 'title', 'quota' }.
     * Returns the registered CompanyData as JSON.
     */
    def registerCompanyByAdmin() {
        // Log a message indicating the controller method called
        log.info("[registerCompanyByAdmin] Controller method called")

        // Extract company data from the request
        Map requestData = request.getJSON() as Map
        CompanyData companyData = new CompanyData(
                title: requestData.title,
                quota: requestData.quota.toInteger()
        )

        // Call the CompanyService to register a new company
        CompanyData result = companyService.registerCompanyByAdmin(companyData)

        // Render the registered company data as JSON
        render(result as JSON)
    }

    /**
     * Controller method to get company data by ID.
     * Expects JSON: { 'companyId' }.
     * Returns the CompanyData for the specified ID as JSON.
     */
    def getCompanyById() {
        Long companyId = params.companyId as Long

        // Log a message indicating the controller method called
        log.info("[getCompanyById] Controller method called with companyId: ${companyId}")

        // Call the CompanyService to get the company by ID
        CompanyData company = companyService.getCompanyById(companyId)

        // Render the company details as JSON
        render(company as JSON)
    }

    /**
     * Controller method to list all companies.
     * Returns a list of CompanyData as JSON.
     */
    def listCompanies() {
        // Log a message indicating the controller method called
        log.info("[listCompanies] Controller method called")

        // Call the CompanyService to retrieve a list of all companies
        List<CompanyData> companies = companyService.listCompanies()

        // Render the list of companies as JSON
        render(companies as JSON)
    }

    /**
     * Controller method to list companies owned by the logged-in user.
     * Returns a list of owned CompanyData as JSON.
     */
    def listOwnedCompanies() {
        // Log a message indicating the controller method called
        log.info("[listOwnedCompanies] Controller method called")

        // Call the CompanyService to retrieve a list of owned companies
        List<CompanyData> ownedCompanies = companyService.listOwnedCompanies()

        // Render the list of owned companies as JSON
        render(ownedCompanies as JSON)
    }

    /**
     * Controller method to list companies in which the logged-in user is enrolled.
     * Returns a list of enrolled CompanyData as JSON.
     */
    def listUserEnrolledCompanies() {
        // Log a message indicating the controller method called
        log.info("[listUserEnrolledCompanies] Controller method called")

        // Call the CompanyService to retrieve a list of all companies
        List<CompanyData> companies = companyService.listUserEnrolledCompanies()

        // Render the list of companies as JSON
        render(companies as JSON)
    }

    /**
     * Controller method to update a company.
     * Expects JSON: { 'newTitle', 'newQuota' }.
     * Path parameter: 'companyId'.
     * Returns the updated CompanyData as JSON.
     */
    def updateCompany() {
        // Log a message indicating the controller method called
        def requestData = request.getJSON() as Map
        Long companyId = params.companyId as Long
        log.info("[updateCompany] Controller method called with companyId: $companyId")

        // Extract updated company data from the request
        CompanyData companyData = new CompanyData(
                title: requestData.newTitle,
                quota: requestData.newQuota.toInteger()
        )

        // Call the CompanyService to update a company
        CompanyData result = companyService.updateCompany(companyId, companyData)

        // Render the updated company data as JSON
        render(result as JSON)
    }

    /**
     * Controller method to delete a company.
     * Path parameter: 'companyId'.
     * Responds with a success message upon deletion.
     */
    def deleteCompany() {
        // Log a message indicating the controller method called
        Long companyId = params.companyId as Long
        log.info("[deleteCompany] Controller method called with companyId: $companyId")

        // Call the CompanyService to delete the selected company
        companyService.deleteCompany(companyId)

        // Respond with success
        render([message: "Company deleted successfully"] as JSON)
    }
}
