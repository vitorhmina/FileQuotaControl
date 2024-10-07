databaseChangeLog = {
	include file: 'V001_create_user_type_table.groovy'
	include file: 'V001_create_user_table.groovy'
	include file: 'V001_create_company_table.groovy'
	include file: 'V001_create_user_company_table.groovy'
	include file: 'V001_create_tag_table.groovy'
	include file: 'V001_create_folder_table.groovy'
	include file: 'V001_create_document_table.groovy'
	include file: 'V001_create_tag_association_table.groovy'
	include file: 'V001_create_linkable_table.groovy'
}
