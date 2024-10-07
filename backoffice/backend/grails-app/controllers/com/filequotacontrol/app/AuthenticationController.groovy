package com.filequotacontrol.app

import grails.converters.JSON
import groovy.util.logging.Slf4j

@Slf4j("log")
class AuthenticationController {
	AuthenticationService authenticationService

	def login() {
		Map requestData = request.getJSON() as Map

		String username = requestData.username
		String password = requestData.password

		UserData result = authenticationService.login(username, password)
		render(result as JSON)
	}

	def logout() {
		String token = request.getHeader('Authorization')?.replace('Bearer ', '')
		authenticationService.logout(token)
		render(status: 200)
	}
}
