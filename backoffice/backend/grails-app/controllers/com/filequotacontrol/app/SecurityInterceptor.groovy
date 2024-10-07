package com.filequotacontrol.app

import io.micronaut.http.HttpStatus

class SecurityInterceptor {
	SecurityService securityService

	SecurityInterceptor() {
		match(controller: 'bookmark', action: 'saveBookmarkSample')
		match(controller: 'bookmark', action: 'retrieveBookmarksSample')
	}

	boolean before() {
		if (!securityService.authorized(request)) {
			response.status = HttpStatus.UNAUTHORIZED.value()
			return false
		}
		return true
	}

	boolean after() { true }
}
