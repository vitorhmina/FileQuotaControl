package com.filequotacontrol.app

import grails.converters.JSON
import groovy.util.logging.Slf4j

@Slf4j("log")
class UserTypeController {

    UserTypeService userTypeService

    /**
     * Controller method to create a new User Type.
     * Expects JSON: { 'userType' }.
     * Returns the created UserTypeData as JSON.
     */
    def createUserType() {
        Map requestData = request.getJSON() as Map

        String userType = requestData.userType

        UserTypeData result = userTypeService.createUserType(userType)
        render(result as JSON)
    }

    /**
     * Controller method to retrieve UserTypeData by ID.
     * Path parameter: 'userTypeId'.
     * Returns UserTypeData as JSON.
     */
    def getUserTypeById() {
        Long userTypeId = params.userTypeId as Long

        log.info("[getUserTypeById] Controller method called with userTypeId: $userTypeId")

        // Call the UserTypeService to get UserTypeData by ID
        UserTypeData userTypeData = userTypeService.getUserTypeById(userTypeId)

        // Render the UserTypeData as JSON
        render(userTypeData as JSON)
    }

    /**
     * Controller method to retrieve a list of all User Types.
     * Returns a list of UserTypeData as JSON.
     */
    def listUserTypes() {
        // Call the UserTypeService to retrieve a list of all user types
        List<UserTypeData> userTypes = userTypeService.listUserTypes()

        // Render the list of user types as JSON
        render(userTypes as JSON)
    }

    /**
     * Controller method to update a User Type.
     * Expects JSON: { 'newUserType' }.
     * Path parameter: 'userTypeId'.
     * Returns the updated UserTypeData as JSON.
     */
    def updateUserType() {
        def requestData = request.getJSON() as Map
        Long userTypeId = params.userTypeId as Long

        String newUserType = requestData.newUserType

        log.info("[updateUserType] Controller method called with userTypeId: $userTypeId")

        // Call the UserTypeService to update a user type
        UserTypeData result = userTypeService.updateUserType(userTypeId, newUserType)

        // Render the updated result as JSON
        render(result as JSON)
    }

    /**
     * Controller method to delete a User Type by ID.
     * Path parameter: 'userTypeId'.
     * Responds with a success message upon deletion.
     */
    def deleteUserType() {
        Long userTypeId = params.userTypeId as Long

        log.info("[deleteUserType] Controller method called with userTypeId: $userTypeId")

        // Call the UserTypeService to delete the user type
        UserTypeData userTypeData = userTypeService.deleteUserType(userTypeId)

        // Respond with success
        render([message: "User Type deleted successfully"] as JSON)
    }
}
