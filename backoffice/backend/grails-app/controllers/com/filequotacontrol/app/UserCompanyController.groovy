package com.filequotacontrol.app

import grails.converters.JSON
import groovy.util.logging.Slf4j

@Slf4j("log")
class UserCompanyController {

    UserCompanyService userCompanyService;

    /**
     * Controller method to assign a role for a selected user in a selected company.
     * Expects JSON: { 'role', 'userId', 'companyId' }.
     * Returns the created UserCompanyData as JSON.
     */
    def assignUserRole() {
        def requestData = request.getJSON() as Map

        String role = requestData.role
        Long userId = requestData.userId
        Long companyId = requestData.companyId

        log.info("[assignUserRole] Received Request Data: $requestData")
        log.info("[assignUserRole] userId: $userId")
        log.info("[assignUserRole] companyId: $companyId")

        UserCompanyData result = userCompanyService.createUserCompany(role, userId, companyId)
        render(result as JSON)
    }

    /**
     * Controller method to retrieve UserCompanyData by ID.
     * Path parameter: 'userCompanyId'.
     * Returns UserCompanyData as JSON.
     */
    def getUserCompanyById() {
        Long userCompanyId = params.userCompanyId as Long

        log.info("[getUserCompanyById] Controller method called with userCompanyId: $userCompanyId")

        // Call the UserCompanyService to get UserCompanyData by ID
        UserCompanyData userCompanyData = userCompanyService.getUserCompanyById(userCompanyId)

        // Render the UserCompanyData as JSON
        render(userCompanyData as JSON)
    }

    /**
     * Controller method to list employees in a specified company.
     * Path parameter: 'companyId'.
     * Returns a list of UserCompanyData as JSON.
     */
    def listCompanyEmployees() {
        Long companyId = params.getLong('companyId')

        // Call the CompanyService to retrieve a list of employees in the specified company
        List<UserCompanyData> users = userCompanyService.listUsersInCompany(companyId)

        // Render the list of employees as JSON
        render(users as JSON)
    }

    /**
     * Controller method to list roles assigned to a user.
     * Returns a list of UserCompanyData as JSON.
     */
    def listUserRoles() {
        // Call the UserCompanyService to retrieve a list of roles assigned to a user
        List<UserCompanyData> companies = userCompanyService.listUserRoles()

        // Render the list of roles as JSON
        render(companies as JSON)
    }

    /**
     * Controller method to update a user's role in a company.
     * Expects JSON: { 'newRole' }.
     * Path parameter: 'userCompanyId'.
     * Returns the updated UserCompanyData as JSON.
     */
    def updateUserCompany() {
        def requestData = request.getJSON() as Map
        Long userCompanyId = params.userCompanyId as Long

        String role = requestData.newRole

        log.info("[updateUserCompany] Controller method called with userCompanyId: $userCompanyId")

        // Call the UserCompanyService to update a user's role
        UserCompanyData result = userCompanyService.updateRole(userCompanyId, role)

        // Render the updated result as JSON
        render(result as JSON)
    }

    /**
     * Controller method to delete a UserCompany by ID.
     * Path parameter: 'userCompanyId'.
     * Responds with a success message upon deletion.
     */
    def deleteUserCompany() {
        Long userCompanyId = params.userCompanyId as Long

        log.info("[deleteUserCompany] Controller method called with userCompanyId: $userCompanyId")

        // Call the UserCompanyService to delete the UserCompany
        UserCompanyData userCompanyData = userCompanyService.deleteUserCompany(userCompanyId)

        // Respond with success
        render([message: "UserCompany deleted successfully"] as JSON)
    }
}
