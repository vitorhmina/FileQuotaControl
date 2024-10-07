package com.filequotacontrol.app

import groovy.util.logging.Slf4j
import grails.gorm.transactions.Transactional
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.security.SecureRandom

@Slf4j("log")
@Transactional
class UserService {

    UserTypeService userTypeService;
    UserService userService;
    CompanyService companyService;
    User loggedInUser = AuthenticationService.getLoggedInUser();

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10, new SecureRandom())

    // Service method to register a User
    UserData registerUser(UserData userData, String password) {
        // Log a message indicating the service operation
        log.info("[createUser] Service To Register User")

        User newUser = userService.createUser(userData, password)

        try {
            newUser.userType = UserType.get(2);
            newUser.save();

            // Verify if the save operation was successful or not
            if (!newUser || !newUser.id) {
                log.error("Failed to save the user: $newUser")
                throw new RuntimeException("Failed to save the user");
            }

            // Build UserData and return it
            return buildUserData(newUser)
        } catch (Exception e) {
            log.error("Exception during user registration", e)
            throw new RuntimeException("Failed to save the user", e)
        }
    }

    // Service method to register a User by Admin
    UserData registerUserByAdmin(UserData userData, String password, Long userTypeId) {
        log.info("[createUser] Service To Register User with user type ID: ${userTypeId}")

        User newUser = userService.createUser(userData, password)

        UserType userType = UserType.get(userTypeId)
        if (userType == null) {
            log.error("User type with ID $userTypeId not found")
            throw new RuntimeException("User type not found: $userTypeId")
        }

        newUser.userType = userType
        newUser.save()

        return buildUserData(newUser)
    }

    // Service method to create a User object
    User createUser(UserData userData, String password) {
        // Log a message indicating the service operation
        log.info("[createUser] Service To Create User")

        // Validate input data
        if (!userData.username || !userData.firstName || !userData.lastName || !userData.email || !password) {
            throw new IllegalArgumentException("User data cannot be null or empty");
        }

        // Encode the password
        String encodedPassword = passwordEncoder.encode(password)

        // Create a new User instance
        User newUser = new User(
                username: userData.username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: encodedPassword,
                enabled: true,
                token: null,
                tokenLimit: null,
                userType: null,
        )

        // Return User Instance
        return newUser
    }

    // Service method to get User by ID
    UserData getUserById(Long id) {
        // Log a message indicating the service operation
        log.info("[getUserById] Service To Get User By ID");

        // Check if the input 'id' is null or less than 1 and throw an exception if it is
        if (id == null || id < 1) {
            throw new IllegalArgumentException("Invalid ID");
        }

        // Retrieve the UserType instance with the given ID from the database
        User user = User.get(id);

        // Check if the retrieved User instance is null and throw an exception if it is
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Return the user object
        return buildUserData(user);
    }

    // Service method to list Users
    List<UserData> listUsers() {
        // Log a message indicating the service operation
        log.info("[listUsers] Service To List Users")

        // Retrieve a list of all users from the database
        List<User> users = User.list()

        // Build UserData for each User and store them in a list
        List<UserData> userDataList = users.collect { user ->
            buildUserData(user)
        }

        return userDataList
    }

    // Service method to list Enabled Users
    List<UserData> listEnabledUsers() {
        // Log a message indicating the service operation
        log.info("[listEnabledUsers] Service To List Enabled Users")

        // Retrieve a list of enabled users from the database
        List<User> enabledUsers = User.findAllByEnabled(true)

        // Build UserData for each enabled User and store them in a list
        List<UserData> userDataList = enabledUsers.collect { user ->
            buildUserData(user)
        }

        return userDataList
    }

    // Service method to update a User
    UserData updateUser(Long userId, UserData userData, String password) {
        // Check if the user exists
        User user = User.get(userId)
        if (user == null) {
            throw new IllegalArgumentException("User with id $userId does not exist")
        }

        // Encode the password
        String encodedPassword = passwordEncoder.encode(password)

        // Update the user
        user.username = userData.username
        user.firstName = userData.firstName
        user.lastName = userData.lastName
        user.email = userData.email
        user.password = encodedPassword
        user.save(flush: true)

        // Return the updated UserData
        return buildUserData(user)
    }

    // Service method to delete a User
    void deleteUser(Long userId) {
        // Log a message indicating the service operation
        log.info("[deleteUser] Service To Delete User with ID: ${userId}")

        // Retrieve the User instance with the given ID from the database
        User user = User.get(userId)

        // Check if the retrieved User instance is null and throw an exception if it is
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Delete associated UserCompany connections
        UserCompany.deleteAllByUser(user)

        // Update the status of the user to disabled
        user.enabled = false
        user.save()
    }

    // A private method to build UserData from User
    private static buildUserData(User user) {
        // Verify if the input user is not null
        if (user == null) {
            throw new IllegalArgumentException("User is null");
        }

        // Build UserData and return it
        return new UserData(user);
    }
}
