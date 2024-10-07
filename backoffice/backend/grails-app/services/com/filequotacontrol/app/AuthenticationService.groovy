package com.filequotacontrol.app

import grails.gorm.transactions.Transactional
import groovy.time.TimeCategory
import groovy.util.logging.Slf4j
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

import java.security.SecureRandom

@Slf4j("log")
@Transactional
class AuthenticationService {
	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10, new SecureRandom())

	static User loggedInUser

	// Login
	UserData login(String username, String password) {
		log.info("[login] Attempting Login For User [$username]")

		// Check If User Exists
		User user = User.findByUsernameAndEnabled(username, true)
		if (!user) {
			throw new Exception("[login] User [$username] Was Not Found")
		}

		// Compare Passwords
		if (!passwordEncoder.matches(password, user.password)) {
			throw new Exception("[login] Password For User [$username] Does Not Match")
		}

		// Save throughout the application the logged in User object
		loggedInUser = user

		// Generate New Token
		user.token = UUID.randomUUID().toString()

		// Generate Token Limit
		use(TimeCategory) {
			user.tokenLimit = new Date() + 1.day
		}
		user.save(flush: true, failOnError: true)

		// Refresh User Object
		user.refresh()

		// Return User Data
		return buildUserData(user)
	}

	// Logout
	void logout(String token) {
		log.info("[logout] Logout For User With Token [$token]")

		// Check If User Exists
		User user = User.findByTokenAndEnabled(token, true)

		// Remove Token And Token Limit
		if (user) {
			user.token = null
			user.tokenLimit = null
			user.save(flush: true, failOnError: true)

			// Set loggedInUser to null
			loggedInUser = null
		} else {
			log.warn("[login] User With Token [$token] Was Not Found")
		}
	}

	public static User getLoggedInUser() {
		return loggedInUser;
	}

	// Build User Data From User Domain Class
	private static buildUserData(User user) {
		return new UserData(user)
	}
}
