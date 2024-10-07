package com.filequotacontrol.app

import ch.qos.logback.classic.Level
import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration
import org.apache.commons.io.FilenameUtils
import org.grails.boot.internal.EnableAutoConfiguration
import org.springframework.beans.factory.config.YamlPropertiesFactoryBean
import org.springframework.context.EnvironmentAware
import org.springframework.core.env.Environment
import org.springframework.core.env.PropertiesPropertySource
import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource

import java.text.SimpleDateFormat

@EnableAutoConfiguration()
class Application extends GrailsAutoConfiguration implements EnvironmentAware {
	final static String APP_NAME = 'filequotacontrol'

	static String getHomeDir() {
		return FileLocationUtil.configurationDir(APP_NAME)
	}

	static void main(String[] args) {
		GrailsApp.run(Application, args)
	}

	@Override
	void setEnvironment(Environment environment) {
		println "Setting environment"
		String pattern = "dd.MM.yyyy HH:mm:ss"
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern)
		println "Start date: " + simpleDateFormat.format(new Date())
		println "Current environment : ${ grails.util.Environment.current }"
		println "Address: " + InetAddress.getLocalHost().getHostAddress()
		println "Application name: " + APP_NAME
		println """
            Environment variables:
            JAVA_OPTS: [${ System.getenv('JAVA_OPTS') }]
            GRAILS_OPTS: [${ System.getenv('GRAILS_OPTS') }]
            SAMPLE_HOME: [${ System.getenv('FILEQUOTACONTROL_HOME') }]
        """

		try {
			environment.propertySources.addFirst(new PropertiesPropertySource("filequotacontrol.config.location", getProperties()))
		} catch (Exception ignored) {
			println "ERROR: Config file not found"
			System.exit(-1)
		}

	}

	static Level getLogLevel(Level defaultLevel) {
		String configLogLevel = getProperties().get('grails.log.level')
		return Level.toLevel(configLogLevel, defaultLevel)
	}

	private Properties getProperties() {
		String configFileNameYml = "$APP_NAME-config.yml"
		String configFileNameProperties = "$APP_NAME-config.properties"

		String configFilePathYml = FilenameUtils.concat(getHomeDir(), "conf/$configFileNameYml")
		String configFilePathProperties = FilenameUtils.concat(getHomeDir(), "conf/$configFileNameProperties")
		Properties properties = new Properties()
		if (new File(configFilePathYml).exists()) {
			println("Loading config from ${ configFilePathYml }")
			Resource resourceConfig = new FileSystemResource(configFilePathYml)
			YamlPropertiesFactoryBean propertyFactoryBean = new YamlPropertiesFactoryBean()
			propertyFactoryBean.setResources(resourceConfig)
			propertyFactoryBean.afterPropertiesSet()
			properties = propertyFactoryBean.getObject()
		} else if (new File(configFilePathProperties).exists()) {

			println("Loading config from ${ configFileNameProperties }")
			properties.load(new File(configFilePathProperties).newReader())

		} else {
			throw new Exception("Config file $configFilePathYml or $configFileNameProperties doesn't exist")
		}

		return properties
	}
}
