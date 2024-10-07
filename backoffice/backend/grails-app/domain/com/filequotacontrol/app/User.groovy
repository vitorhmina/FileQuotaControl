package com.filequotacontrol.app

class User {
	Long id
	String username
	String firstName
	String lastName
	String email
	String password
	Boolean enabled
	String token
	Date tokenLimit
	UserType userType

	static constraints = {
		username blank: false, nullable: false, unique: true
		firstName blank: false, nullable: false
		lastName blank: false, nullable: false
		email blank: false, nullable: false, unique: true
		password blank: false, nullable: false
		enabled nullable: true
		token nullable: true
		tokenLimit nullable: true
		userType blank: false, nullable: false
	}

	static mapping = {
		table 'USER'
		username column: 'username'
		firstName column: 'first_name'
		lastName column: 'last_name'
		email column: 'email'
		password column: 'password'
		enabled column: 'enabled'
		token column: 'token'
		tokenLimit column: 'token_limit'
		userType column: 'user_type_id'
		version false
	}
}
