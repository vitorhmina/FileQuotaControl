package com.filequotacontrol.app

class UserData {
	Long userId
	String username
	String firstName
	String lastName
	String email
	String token
	Long userTypeId

	UserData() {

	}

	UserData(User user) {
		this.username = user.username
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.email = user.email
		this.token = user.token
		this.userTypeId = user.userTypeId
		this.userId = user.id

	}
}
