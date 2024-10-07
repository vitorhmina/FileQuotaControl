package com.filequotacontrol.app

import groovy.util.logging.Slf4j
import grails.gorm.transactions.Transactional

@Slf4j("log")
@Transactional
class UserCompanyService {

    UserService userService;
    CompanyService companyService;

    User loggedInUser = AuthenticationService.getLoggedInUser();

    // Service method to create a UserCompany
    UserCompanyData createUserCompany(String role, Long userId, Long companyId) {
        // Log a message indicating the service operation
        log.info("[createUserCompany] Service To Create User Company");
        log.info("Received User ID: ${userId}")
        log.info("Received Company ID: ${companyId}")

        log.info("[createUserCompany] Creating UserCompany - Role: $role, User: $userId, Company: $companyId")


        // Check if any of the input parameters is null and throw an exception if they are
        if (role == null || userId == null || companyId == null) {
            throw new IllegalArgumentException("Role, User, and Company cannot be null");
        }

        User user = User.get(userId)
        Company company = Company.get(companyId)

        // Create a new UserCompany instance and set its properties
        UserCompany userCompany = new UserCompany(
                role: role,
                user: user,
                company: company
        )

        log.info("Before saving: ${userCompany}")
        userCompany.save()
        log.info("After saving: ${userCompany}")

        // Return the created UserCompany instance
        return buildUserCompanyData(userCompany)
    }

    // Service method to get UserCompany by ID
    UserCompanyData getUserCompanyById(Long userCompanyId) {
        // Log a message indicating the service operation
        log.info("[getUserCompanyById] Service To Get UserCompany with ID: ${userCompanyId}");

        // Check if the input 'userCompanyId' is null or less than 1 and throw an exception if it is
        if (userCompanyId == null || userCompanyId < 1) {
            throw new IllegalArgumentException("Invalid ID");
        }

        // Retrieve the Tag instance with the given userCompanyId from the database
        UserCompany userCompany = UserCompany.get(userCompanyId);

        // Check if the retrieved UserCompany instance is null and throw an exception if it is
        if (userCompany == null) {
            throw new RuntimeException("UserCompany not found");
        }

        // Return the UserCompanyData
        return buildUserCompanyData(userCompany);
    }

    List<UserCompanyData> listUsersInCompany(Long companyId) {
        if (companyId == null) {
            throw new IllegalArgumentException("Company ID cannot be null")
        }

        // Get the company
        Company company = Company.get(companyId)

        // Query the UserCompany table to get the list of users for the company
        List<UserCompany> userCompanies = UserCompany.findAllByCompany(company)

        // Build UserData for each User and store them in a list, including user type
        List<UserCompanyData> users = userCompanies.collect { userCompany ->
            def userCompanyData = buildUserCompanyData(userCompany)
            // Fetch the user type using userTypeId
            User user = userCompany.user
            userCompanyData.username = user ? user.username : null
            userCompanyData
        }

        return users
    }

    List<CompanyData> listUserRoles() {

        // Query the UserCompany table to get the list of companies for the user
        List<UserCompany> userCompanies = UserCompany.findAllByUser(loggedInUser)

        // Build CompanyData for each UserCompany and store them in a list
        List<UserCompanyData> companies = userCompanies.collect { userCompany ->
            def userCompanyData = buildUserCompanyData(userCompany)
            // Fetch the user type using userTypeId
            Company company = userCompany.company
            userCompanyData.companyName = company ? company.title : null
            userCompanyData
        }

        return companies
    }

    // Service method to update a UserCompany's role
    UserCompanyData updateRole(Long userCompanyId, String role) {
        log.info("[updateRole] Service To Update Role on UserCompany with ID: ${userCompanyId}")

        // Check if the userCompany exists
        UserCompany userCompany = UserCompany.get(userCompanyId)
        if (userCompany == null) {
            throw new IllegalArgumentException("UserCompany with id $userCompanyId does not exist")
        }

        // Update the userCompany
        userCompany.role = role
        userCompany.save(flush: true)

        // Return the updated UserCompanyData
        return buildUserCompanyData(userCompany)
    }

    // Service method to delete a UserCompany
    void deleteUserCompany(Long userCompanyId) {
        // Log a message indicating the service operation
        log.info("[deleteUserCompany] Service To Delete UserCompany with ID: ${userCompanyId}")

        // Retrieve the UserCompany instance with the given ID from the database
        UserCompany userCompany = UserCompany.get(userCompanyId)

        // Check if the retrieved UserCompany instance is null and throw an exception if it is
        if (userCompany == null) {
            throw new RuntimeException("UserCompany not found");
        }

        // Delete the selected userCompany
        userCompany.delete()
    }

    // A private method to build UserCompanyData from UserCompany
    private static buildUserCompanyData(UserCompany userCompany) {
        // Verify if the input userCompany is not null
        if (userCompany == null) {
            throw new IllegalArgumentException("UserCompany is null");
        }

        // Build UserCompanyData and return it
        return new UserCompanyData(userCompany);
    }
}
