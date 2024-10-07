package com.filequotacontrol.app

import grails.converters.JSON
import groovy.util.logging.Slf4j

@Slf4j("log")
class UserController {

    UserService userService

    /**
     * Controller method to register a new user.
     * Expects JSON: { 'username', 'firstName', 'lastName', 'email', 'password' }.
     * Returns the registered UserData as JSON.
     */
    def registerUser() {
        // Log a message indicating the controller method called
        log.info("[registerUser] Controller method called")

        // Extract user data from the request
        Map requestData = request.getJSON() as Map
        UserData userData = new UserData(
                username: requestData.username,
                firstName: requestData.firstName,
                lastName: requestData.lastName,
                email: requestData.email
        )

        String password = requestData.password

        // Call the UserService to register a new user with default user type (id = 2)
        UserData result = userService.registerUser(userData, password)

        // Render the registered user data as JSON
        render(result as JSON)
    }

    /**
     * Controller method to register a new user by an admin.
     * Expects JSON: { 'username', 'firstName', 'lastName', 'email', 'password', 'userTypeId' }.
     * Returns the registered UserData as JSON.
     */
    def registerUserByAdmin() {
        // Log a message indicating the controller method called
        log.info("[registerUserByAdmin] Controller method called")

        // Extract user data from the request
        Map requestData = request.getJSON() as Map
        UserData userData = new UserData(
                username: requestData.username,
                firstName: requestData.firstName,
                lastName: requestData.lastName,
                email: requestData.email
        )

        String password = requestData.password
        Long userTypeId = requestData.userTypeId

        // Call the UserService to register a new user by admin
        UserData result = userService.registerUserByAdmin(userData, password, userTypeId)

        // Render the registered user data as JSON
        render(result as JSON)
    }

    /**
     * Controller method to get user data by ID.
     * Path parameter: 'userId'.
     * Returns the UserData for the specified ID as JSON.
     */
    def getUserById() {
        Long userId = params.userId as Long

        // Log a message indicating the controller method called
        log.info("[getUserById] Controller method called with userId: ${userId}")

        // Call the UserService to get UserData by ID
        UserData userData = userService.getUserById(userId)

        // Render the UserData as JSON
        render(userData as JSON)
    }

    /**
     * Controller method to list all users.
     * Returns a list of UserData as JSON.
     */
    def listUsers() {
        // Log a message indicating the controller method called
        log.info("[listUsers] Controller method called")

        // Call the UserService to retrieve a list of all users
        List<UserData> users = userService.listUsers()

        // Render the list of users as JSON
        render(users as JSON)
    }

    /**
     * Controller method to list enabled users.
     * Returns a list of UserData for enabled users as JSON.
     */
    def listEnabledUsers() {
        // Log a message indicating the controller method called
        log.info("[listEnabledUsers] Controller method called")

        // Call the UserService to retrieve a list of enabled users
        List<UserData> users = userService.listEnabledUsers()

        // Render the list of users as JSON
        render(users as JSON)
    }

    /**
     * Controller method to update a user.
     * Expects JSON: { 'newUsername', 'newFirstName', 'newLastName', 'newEmail', 'newPassword' }.
     * Path parameter: 'userId'.
     * Returns the updated UserData as JSON.
     */
    def updateUser() {
        // Log a message indicating the controller method called
        Long userId = params.userId as Long
        log.info("[updateUser] Controller method called with userId: $userId")

        // Extract updated user data from the request
        def requestData = request.getJSON() as Map
        UserData userData = new UserData(
                username: requestData.newUsername,
                firstName: requestData.newFirstName,
                lastName: requestData.newLastName,
                email: requestData.newEmail
        )

        String password = requestData.newPassword

        // Call the UserService to update a user
        UserData result = userService.updateUser(userId, userData, password)

        // Render the updated user data as JSON
        render(result as JSON)
    }

    /**
     * Controller method to delete a user by updating its status.
     * Path parameter: 'userId'.
     * Responds with a success message upon deletion.
     */
    def deleteUser() {
        // Log a message indicating the controller method called
        Long userId = params.userId as Long
        log.info("[deleteUser] Controller method called with userId: $userId")

        // Call the UserService to delete the selected user
        userService.deleteUser(userId)

        // Respond with success
        render([message: "User deleted successfully"] as JSON)
    }
}
