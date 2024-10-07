databaseChangeLog = {
    changeSet(author: "script", id: "V001_create_linkable_table") {
        sqlFile(
                dbms: "mariadb",
                encoding: "utf8",
                endDelimiter: ";",
                path: "V001_create_linkable_table.sql",
                relativeToChangelogFile: "true",
                splitStatements: "true",
                stripComments: "true"
        )
    }
}
