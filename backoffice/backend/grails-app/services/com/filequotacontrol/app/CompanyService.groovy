package com.filequotacontrol.app

import groovy.util.logging.Slf4j
import grails.gorm.transactions.Transactional

@Slf4j("log")
@Transactional
class CompanyService {

    UserCompanyService userCompanyService;
    CompanyService companyService;
    FolderService folderService;

    User loggedInUser = AuthenticationService.getLoggedInUser();

    // Service method to register a Company
    CompanyData registerCompany(CompanyData companyData) {
        // Log a message indicating the service operation
        log.info("[registerCompany] Service To Register Company")

        companyData.quota = 100

        // Create a new Company instance
        Company newCompany = companyService.createCompany(companyData)

        // Save the Company to the database
        newCompany.save()

        // Verify if the save operation was successful or not
        if (!newCompany || !newCompany.id) {
            log.error("Failed to save the company: $newCompany")
            throw new RuntimeException("Failed to save the company")
        }

        // Create a UserCompany object to connect User and Company
        userCompanyService.createUserCompany('Owner', loggedInUser.id, newCompany.id)

        // Create a Root Folder for the Company
        FolderData folderData = new FolderData(
                name: "${newCompany.title} Root"
        )

        // Create a Root Folder for the Company
        folderService.createFolder(folderData, newCompany.id, null)

        // Build Company and return it
        return buildCompanyData(newCompany)
    }

    // Service method to register a Company as Admin
    CompanyData registerCompanyByAdmin(CompanyData companyData) {
        // Log a message indicating the service operation
        log.info("[registerCompanyByAdmin] Service To Register Company as Admin")

        // Create a new Company instance
        Company newCompany = companyService.createCompany(companyData)

        // Save the Company to the database
        newCompany.save()

        // Verify if the save operation was successful or not
        if (!newCompany || !newCompany.id) {
            log.error("Failed to save the company: $newCompany")
            throw new RuntimeException("Failed to save the company")
        }

        // Create a UserCompany object to connect User and Company
        userCompanyService.createUserCompany('Owner', loggedInUser.id, newCompany.id)

        // Create a Root Folder for the Company
        FolderData folderData = new FolderData(
                name: "${newCompany.title} Root"
        )

        // Create a Root Folder for the Company
        folderService.createFolder(folderData, newCompany.id, null)

        // Build Company and return it
        return buildCompanyData(newCompany)
    }

    // Service method to create a Company object
    Company createCompany(CompanyData companyData) {
        // Log a message indicating the service operation
        log.info("[createCompany] Service To Create Company")

        // Validate input data
        if (!companyData.title) {
            throw new IllegalArgumentException("Company data cannot be null or empty");
        }

        // Create a new Company instance
        Company newCompany = new Company(
                title: companyData.title,
                quota: companyData.quota,
        )

        // Return Company Instance
        return newCompany
    }

    // Service method to get Company by ID
    CompanyData getCompanyById(Long companyId) {
        // Log a message indicating the service operation
        log.info("[getCompanyById] Service To Get Company with ID: ${companyId}");


        // Check if the input 'companyId' is null or less than 1 and throw an exception if it is
        if (companyId == null || companyId < 1) {
            throw new IllegalArgumentException("Invalid ID");
        }

        // Retrieve the Company instance with the given ID from the database
        Company company = Company.get(companyId);

        // Check if the retrieved Company instance is null and throw an exception if it is
        if (company == null) {
            throw new RuntimeException("Company not found");
        }

        // Return the company object
        return buildCompanyData(company);
    }

    // Service method to list Companies
    List<CompanyData> listCompanies() {
        // Log a message indicating the service operation
        log.info("[listCompanies] Service To List Companies")

        // Retrieve a list of all companies from the database
        List<Company> companies = Company.list()

        // Sort the companies list by id
        companies.sort { it.id }

        // Build CompanyData for each Company and store them in a list
        List<CompanyData> companyDataList = companies.collect { buildCompanyData(it) }

        return companyDataList
    }

    // Service method to list Companies owned by the logged in user
    List<CompanyData> listOwnedCompanies() {
        // Log a message indicating the service operation
        log.info("[listOwnedCompanies] Service To List Companies Owned by the Logged-in User")

        // Retrieve a list of UserCompany instances for the logged-in user
        List<UserCompany> userCompanies = UserCompany.findAllByUserAndRole(loggedInUser, 'Owner')

        // Extract the companies from the UserCompany instances
        List<Company> companies = userCompanies.collect { it.company }

        // Sort the companies list by id
        companies.sort { it.id }

        // Build CompanyData for each Company and store them in a list
        List<CompanyData> companyDataList = companies.collect { buildCompanyData(it) }

        return companyDataList
    }

    // Service method to list Companies enrolled by the logged in user
    List<CompanyData> listUserEnrolledCompanies() {
        // Log a message indicating the service operation
        log.info("[listUserEnrolledCompanies] Service To List Companies Enrolled by the Logged-in User")

        // Retrieve a list of UserCompany instances for the logged-in user
        List<UserCompany> userCompanies = UserCompany.findAllByUser(loggedInUser)

        // Extract the companies from the UserCompany instances
        List<Company> companies = userCompanies.collect { it.company }

        // Sort the companies list by id
        companies.sort { it.id }

        // Build CompanyData for each Company and store them in a list
        List<CompanyData> companyDataList = companies.collect { buildCompanyData(it) }

        return companyDataList
    }

    // Service method to update a Company
    CompanyData updateCompany(Long companyId, CompanyData companyData) {
        // Check if the company exists
        Company company = Company.get(companyId)
        if (company == null) {
            throw new IllegalArgumentException("Company with id $companyId does not exist")
        }

        // Update the company
        company.title = companyData.title
        company.quota = companyData.quota
        company.save(flush: true)

        // Return the updated CompanyData
        return buildCompanyData(company)
    }

    // Service method to delete a Company
    void deleteCompany(Long companyId) {
        // Check if the company exists
        Company company = Company.get(companyId)
        if (company == null) {
            throw new IllegalArgumentException("Company with id $companyId does not exist")
        }

        // Retrieve a list of UserCompany instances for the company
        List<UserCompany> userCompanies = UserCompany.findAllByCompany(company)

        // Delete the UserCompany instances
        userCompanies.each { it.delete() }

        // Retrieve a list of Tag instances for the company
        List<Tag> tags = Tag.findAllByCompany(company)

        // Delete the Tag instances
        tags.each { it.delete() }

        // Delete the company
        company.delete()
    }

    // A private method to build CompanyData from Company
    private static buildCompanyData(Company company) {
        // Verify if the input company is not null
        if (company == null) {
            throw new IllegalArgumentException("Company is null");
        }

        // Build CompanyData and return it
        return new CompanyData(company);
    }
}
