package com.filequotacontrol.app

class FileLocationUtil {
	static String configurationDir(String applicationName) {
		String APP_HOME = "${ applicationName.toUpperCase() }_HOME"
		String home = System.getenv(APP_HOME)
		if (!home) {
			if (System.getProperty("os.name").toLowerCase().contains('windows')) {
				home = "C:/$applicationName"
			} else {
				home = "/etc/$applicationName"
			}
		}
		return home
	}
}
