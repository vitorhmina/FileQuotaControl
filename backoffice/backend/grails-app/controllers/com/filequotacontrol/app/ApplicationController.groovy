package com.filequotacontrol.app

import grails.converters.JSON
import grails.core.GrailsApplication
import grails.plugins.GrailsPluginManager
import grails.plugins.PluginManagerAware

class ApplicationController implements PluginManagerAware {
	GrailsApplication grailsApplication
	GrailsPluginManager pluginManager

	def index() {
		Map appInfo = grailsApplication.config.info.app as Map
		render(appInfo as JSON)
	}
}
