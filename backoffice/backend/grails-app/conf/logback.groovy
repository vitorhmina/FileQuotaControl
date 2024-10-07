import ch.qos.logback.core.util.FileSize
import com.filequotacontrol.app.Application
import grails.util.Environment
import org.springframework.boot.logging.logback.ColorConverter
import org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter

import java.nio.charset.Charset

conversionRule 'clr', ColorConverter
conversionRule 'wex', WhitespaceThrowableProxyConverter

String HOME_DIR = Application.getHomeDir()

String customLogDir = System.getenv("${ Application.APP_NAME.toUpperCase() }_LOG_DIR")
String logFileLocation = "${ HOME_DIR }/logs/${ Environment.currentEnvironment.name }/${ Application.APP_NAME }-backoffice"
if (customLogDir) {
	if (customLogDir.toLowerCase() == 'null' || customLogDir.toLowerCase() == 'undefined') {
		logFileLocation = null // null/undefined if the system does not allow external log files
	} else {
		logFileLocation = customLogDir// Override log file location if ENV variable is there.
	}
}

// Console output (intellij or catalina.out)
appender('STDOUT', ConsoleAppender) {
	encoder(PatternLayoutEncoder) {
		charset = Charset.forName('UTF-8')
		pattern =
			'%clr(%d{yyyy-MM-dd HH:mm:ss}){faint} ' + // Date
				'[%clr(%5p)] ' + // Log level
				'%clr(---){faint} %clr([%15.15t]){faint} ' + // Thread
				'%clr(%-40.40logger{39}){cyan} %clr(:){faint} ' + // Logger
				'%m%n%wex' // Message
	}
}
if (logFileLocation) {
	// External file output. If we have access
	appender("EXTERNAL_FILES", RollingFileAppender) {
		append = true
		file = "${ logFileLocation }.log"
		encoder(PatternLayoutEncoder) {
			pattern = "%d{yyyy-MM-dd HH:mm:ss} [%-8p] %-20c{0} %m%n%rEx{full, org}"
		}
		rollingPolicy(TimeBasedRollingPolicy) {
			fileNamePattern = "${ logFileLocation }-%d{yyyy-MM-dd}.log"
			maxHistory = 30
			totalSizeCap = FileSize.valueOf("2GB")
		}
	}
}

if (Environment.isDevelopmentMode() && logFileLocation) {
	// In dev mode, log in the console + put the stacktrace in an external file
	root(Application.getLogLevel(DEBUG), ['STDOUT', 'EXTERNAL_FILES'])
} else if (Environment.isDevelopmentMode()) {
	// in dev and no external files => put only in console
	root(Application.getLogLevel(DEBUG), ['STDOUT'])
} else if (logFileLocation) {
	// In prod mode, write log in an external file only
	root(Application.getLogLevel(INFO), ['EXTERNAL_FILES', 'STDOUT'])
} else {
	// Some production server does not allow external file logging
	root(Application.getLogLevel(INFO), ['STDOUT'])
}




