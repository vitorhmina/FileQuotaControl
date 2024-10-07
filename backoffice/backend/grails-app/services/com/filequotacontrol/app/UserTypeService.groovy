package com.filequotacontrol.app

import groovy.util.logging.Slf4j
import grails.gorm.transactions.Transactional

@Slf4j("log")
@Transactional
class UserTypeService {

    // Service method to create a User Type
    UserTypeData createUserType(String userType) {
        // Log a message indicating the service operation
        log.info("[createUserType] Service To Create User Type");

        // Check if the input 'userType' is null or empty and throw an exception if it is
        if (userType == null || userType.isEmpty()) {
            throw new IllegalArgumentException("User type cannot be null or empty");
        }

        // Create a new UserType instance and save it
        UserType newUserType = new UserType([
                userType: userType
        ]).save();

        // Verify if the save operation was successful or not
        if (newUserType == null || newUserType.id == null) {
            throw new RuntimeException("Failed to save the user type");
        }

        // Build UserTypeData and return it
        return buildUserTypeData(newUserType);
    }

    // Service method to get User Type by ID
    UserTypeData getUserTypeById(Long userTypeId) {
        // Log a message indicating the service operation
        log.info("[getUserTypeById] Service To Get User Type By ID");


        // Check if the input 'userTypeId' is null or less than 1 and throw an exception if it is
        if (userTypeId == null || userTypeId < 1) {
            throw new IllegalArgumentException("Invalid ID");
        }

        // Retrieve the UserType instance with the given ID from the database
        UserType userType = UserType.get(userTypeId);

        // Check if the retrieved UserType instance is null and throw an exception if it is
        if (userType == null) {
            throw new RuntimeException("User type not found");
        }

        // Return the UserTypeData
        return buildUserTypeData(userType);
    }

    // Service method to list User Types
    List<UserTypeData> listUserTypes() {
        // Log a message indicating the service operation
        log.info("[lisUserTypes] Service To List User Types")

        // Retrieve a list of all user types from the database
        List<UserType> userTypes = UserType.list()

        // Sort the userTypes list by id
        userTypes.sort { it.id }

        // Build UserTypeData for each UserType and store them in a list
        List<UserTypeData> userTypeDataList = userTypes.collect { buildUserTypeData(it) }

        return userTypeDataList
    }

    // Service method to update a UserType's attributes
    UserTypeData updateUserType(Long userTypeId, String newUserType) {
        log.info("[updateUserType] Service To Update UserType with ID: ${userTypeId}")

        // Check if the userType exists
        UserType userType = UserType.get(userTypeId)
        if (userType == null) {
            throw new IllegalArgumentException("UserType with id $userTypeId does not exist")
        }

        // Update the userType
        userType.userType = newUserType
        userType.save(flush: true)

        // Return the updated UserTypeData
        return buildUserTypeData(userType)
    }

    // Service method to delete a UserType
    void deleteUserType(Long userTypeId) {
        // Log a message indicating the service operation
        log.info("[deleteUserType] Service To Delete UserType with ID: ${userTypeId}")

        // Retrieve the UserType instance with the given ID from the database
        UserType userType = UserType.get(userTypeId)

        // Check if the retrieved UserType instance is null and throw an exception if it is
        if (userType == null) {
            throw new RuntimeException("UserType not found");
        }

        // Delete the selected userType
        userType.delete()
    }

    // A private method to build UserTypeData from UserType
    private static buildUserTypeData(UserType userType) {
        // Verify if the input userType is not null
        if (userType == null) {
            throw new IllegalArgumentException("User type is null");
        }

        // Build UserTypeData and return it
        return new UserTypeData(userType);
    }
}
