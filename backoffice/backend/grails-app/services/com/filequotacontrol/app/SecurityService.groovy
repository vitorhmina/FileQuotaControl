package com.filequotacontrol.app

import groovy.util.logging.Slf4j

@Slf4j("log")
class SecurityService {
	AuthenticationService authenticationService

	boolean authorized(Object request) {
		String token = request.getHeader('Authorization')?.replace('Bearer ', '')
		User user = User.findByTokenAndEnabled(token, true)

		// User user = User.findByTokenAndTokenLimitGreaterThanAndEnabled(token, new Date(), true)

		if (!user) {
			authenticationService.logout(token)
			return false
		}
		return true
	}
}
