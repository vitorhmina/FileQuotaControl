package com.filequotacontrol.app

class UrlMappings {
	static mappings = {
		get "/"(controller: 'application', action: 'index')
		post "/login"(controller: 'authentication', action: 'login')
		delete "/logout"(controller: 'authentication', action: 'logout')

		post "/userType/create"(controller: 'userType', action: 'createUserType')
		get "/userType/list"(controller: 'userType', action: 'listUserTypes')
		get "/userType/get/$userTypeId"(controller: 'userType', action: 'getUserTypeById')
		put "/userType/update/$userTypeId"(controller: 'userType', action: 'updateUserType')
		delete "/userType/delete/$userTypeId"(controller: 'userType', action: 'deleteUserType')

		post "/user/create"(controller: 'user', action: 'registerUserByAdmin')
		post "/user/register"(controller: 'user', action: 'registerUser')
		get "/user/get/$userId"(controller: 'user', action: 'getUserById')
		get "/user/list"(controller: 'user', action: 'listUsers')
		get "/user/listEnabled"(controller: 'user', action: 'listEnabledUsers')
		put "/user/update/$userId"(controller: 'user', action: 'updateUser')
		delete "/user/delete/$userId"(controller: 'user', action: 'deleteUser')

		post "/company/register"(controller: 'company', action: 'registerCompany')
		post "/company/create"(controller: 'company', action: 'registerCompanyByAdmin')
		get "/company/get/$companyId"(controller: 'company', action: 'getCompanyById')
		get "/company/listAll"(controller: 'company', action: 'listCompanies')
		get "/company/listOwned"(controller: 'company', action: 'listOwnedCompanies')
		get "/company/list"(controller: 'company', action: 'listUserEnrolledCompanies')
		put "/company/update/$companyId"(controller: 'company', action: 'updateCompany')
		delete "/company/delete/$companyId"(controller: 'company', action: 'deleteCompany')

		post "/userCompany/create"(controller: 'userCompany', action: 'assignUserRole')
		get "/userCompany/get/$userCompanyId"(controller: 'userCompany', action: 'getUserCompanyById')
		get "/userCompany/list/$companyId"(controller: 'userCompany', action: 'listCompanyEmployees')
		get "/userCompany/listUserRoles"(controller: 'userCompany', action: 'listUserRoles')
		put "/userCompany/update/$userCompanyId"(controller: 'userCompany', action: 'updateUserCompany')
		delete "/userCompany/delete/$userCompanyId"(controller: 'userCompany', action: 'deleteUserCompany')

		post "/tag/create"(controller: 'tag', action: 'createTag')
		get "/tag/get/$tagId"(controller: 'tag', action: 'getTagById')
		get "/tag/listAll"(controller: 'tag', action: 'listTags')
		get "/tag/list/$companyId"(controller: 'tag', action: 'listCompanyTags')
		get "/tag/listFolderTags/$folderId"(controller: 'tag', action: 'listFolderTags')
		get "/tag/listDocumentTags/$documentId"(controller: 'tag', action: 'listDocumentTags')
		put "/tag/update/$tagId"(controller: 'tag', action: 'updateTag')
		delete "/tag/delete/$tagId"(controller: 'tag', action: 'deleteTag')

		post "/tagAssociation/assignFolderTag"(controller: 'tagAssociation', action: 'assignTagFolder')
		post "/tagAssociation/assignDocumentTag"(controller: 'tagAssociation', action: 'assignTagDocument')
		delete "/tagAssociation/unassignFolderTag"(controller: 'tagAssociation', action: 'unassignTagFromFolder')
		delete "/tagAssociation/unassignDocumentTag"(controller: 'tagAssociation', action: 'unassignTagFromDocument')

		post "/folder/create"(controller: 'folder', action: 'createFolder')
		get "/folder/get/$folderId"(controller: 'folder', action: 'getFolderById')
		get "/folder/list/$companyId"(controller: 'folder', action: 'listCompanyFolders')
		get "/folder/listDeleted/$folderId"(controller: 'folder', action: 'listCompanyDeletedFolders')
		put "/folder/update/$folderId"(controller: 'folder', action: 'updateFolderName')
		put "/folder/move/$folderId"(controller: 'folder', action: 'moveFolder')
		delete "/folder/delete/$folderId"(controller: 'folder', action: 'deleteFolder')

		post "/document/create"(controller: 'document', action: 'createDocument')
		get "/document/get/$documentId"(controller: 'document', action: 'getDocumentById')
		get "/document/list/$folderId"(controller: 'document', action: 'listFolderDocuments')
		get "/document/listDeleted/$folderId"(controller: 'document', action: 'listFolderDeletedDocuments')
		put "/document/update/$documentId"(controller: 'document', action: 'updateDocument')
		put "/document/move/$documentId"(controller: 'document', action: 'moveDocument')
		delete "/document/delete/$documentId"(controller: 'document', action: 'deleteDocument')

		post "/linkable/documentLink"(controller: 'linkable', action: 'generateDocumentLink')
		post "/linkable/folderLink"(controller: 'linkable', action: 'generateFolderLink')
		get "/linkable/list/$folderId"(controller: 'linkable', action: 'listFolderLinks')
		get "/linkable/list/$documentId"(controller: 'linkable', action: 'listDocumentLinks')

		get "/linkable/download/$publicLink"(controller: 'linkable', action: 'downloadLinkable')

	}
}
