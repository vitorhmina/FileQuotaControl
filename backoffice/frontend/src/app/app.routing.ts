import {Route, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './view/home/home.component';

import {CreateUserTypeComponent} from './view/create-user-type/create-user-type.component';
import {ListUserTypesComponent} from './view/list-user-types/list-user-types.component';

import {CreateUserComponent} from './view/create-user/create-user.component';
import {ListUsersComponent} from './view/list-users/list-users.component';
import {RegisterUserComponent} from "./view/register-user/register-user.component";

import {RegisterCompanyComponent} from './view/register-company/register-company.component';
import {ListCompaniesComponent} from './view/list-companies/list-companies.component';
import {ListOwnedCompaniesComponent} from './view/list-owned-companies/list-owned-companies.component';
import {ListUserEnrolledCompaniesComponent} from './view/list-user-enrolled-companies/list-user-enrolled-companies.component';

import {CreateTagComponent} from './view/create-tag/create-tag.component';
import {ListTagsComponent} from './view/list-tags/list-tags.component';
import {ListCompanyTagsComponent} from './view/list-company-tags/list-company-tags.component';
import {ListFolderTagsComponent} from './view/list-folder-tags/list-folder-tags.component';
import {ListDocumentTagsComponent} from './view/list-document-tags/list-document-tags.component';

import {CreateFolderComponent} from './view/create-folder/create-folder.component';
import {ListCompanyFoldersComponent} from "./view/list-company-folders/list-company-folders.component";

import {CreateDocumentComponent} from './view/create-document/create-document.component';
import {ListFolderDocumentsComponent} from "./view/list-folder-documents/list-folder-documents.component";
import {ListFolderDeletedDocumentsComponent} from "./view/list-folder-deleted-documents/list-folder-deleted-documents.component";

import {GenerateFolderLinkComponent} from "./view/generate-folder-link/generate-folder-link.component";
import {GenerateDocumentLinkComponent} from "./view/generate-document-link/generate-document-link.component";

import {CommonComponent} from './components/common/common.component';
import {LoginComponent} from './view/login/login.component';
import {LogoutComponent} from './view/logout/logout.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {ApiIndexComponent} from "./view/api-index/api-index.component";
import {ListFolderLinksComponent} from "./view/list-folder-links/list-folder-links.component";
import {ListDocumentLinksComponent} from "./view/list-document-links/list-document-links.component";
import {CreateUserCompanyComponent} from "./view/create-user-company/create-user-company.component";
import {ListCompanyEmployeesComponent} from './view/list-company-employees/list-company-employees.component';
import {ListUserRolesComponent} from "./view/list-user-roles/list-user-roles.component";
import {AssignFolderTagComponent} from "./view/assign-folder-tag/assign-folder-tag.component";
import {AssignDocumentTagComponent} from "./view/assign-document-tag/assign-document-tag.component";
import {DeleteDocumentComponent} from "./view/delete-document/delete-document.component";
import {DeleteFolderComponent} from "./view/delete-folder/delete-folder.component";
import {ListCompanyDeletedFoldersComponent} from "./view/list-company-deleted-folders/list-company-deleted-folders.component";
import {UpdateFolderComponent} from "./view/update-folder/update-folder.component";
import {MoveFolderComponent} from "./view/move-folder/move-folder.component";
import {MoveDocumentComponent} from "./view/move-document/move-document.component";
import {UpdateDocumentComponent} from "./view/update-document/update-document.component";
import {DeleteTagComponent} from "./view/delete-tag/delete-tag.component";
import {UpdateTagComponent} from "./view/update-tag/update-tag.component";
import {UpdateUserTypeComponent} from "./view/update-user-type/update-user-type.component";
import {DeleteUserTypeComponent} from "./view/delete-user-type/delete-user-type.component";
import {UnassignDocumentTagComponent} from "./view/unassign-document-tag/unassign-document-tag.component";
import {UnassignFolderTagComponent} from "./view/unassign-folder-tag/unassign-folder-tag.component";
import {UpdateUserCompanyComponent} from "./view/update-user-company/update-user-company.component";
import {DeleteUserCompanyComponent} from "./view/delete-user-company/delete-user-company.component";
import {DeleteUserComponent} from "./view/delete-user/delete-user.component";
import {UpdateUserComponent} from "./view/update-user/update-user.component";
import {CreateCompanyComponent} from "./view/create-company/create-company.component";
import {UpdateCompanyComponent} from "./view/update-company/update-company.component";
import {DeleteCompanyComponent} from "./view/delete-company/delete-company.component";
import {DownloadDocumentComponent} from "./view/download-document/download-document.component";

export const viewsRoutes: Route[] = [{
  path: 'home',
  canActivate: [AuthenticationGuard],
  data: {permissions: {only: []}},
  component: HomeComponent
},
  {
    path: 'api-index',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ApiIndexComponent
  },
  {
    path: 'UserType/create',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: CreateUserTypeComponent
  },
  {
    path: 'UserType/list',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListUserTypesComponent
  },
  {
    path: 'UserType/update',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: UpdateUserTypeComponent
  },
  {
    path: 'UserType/delete',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: DeleteUserTypeComponent
  },
  {
    path: 'User/create',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: CreateUserComponent
  },
  {
    path: 'User/register',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: RegisterUserComponent
  },
  {
    path: 'User/list',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListUsersComponent
  },
  {
    path: 'User/update',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: UpdateUserComponent
  },
  {
    path: 'User/delete',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: DeleteUserComponent
  },
  {
    path: 'Company/register',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: RegisterCompanyComponent
  },
  {
    path: 'Company/create',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: CreateCompanyComponent
  },
  {
    path: 'Company/listAll',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListCompaniesComponent
  },
  {
    path: 'Company/listOwned',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListOwnedCompaniesComponent
  },
  {
    path: 'Company/list',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListUserEnrolledCompaniesComponent
  },
  {
    path: 'Company/update',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: UpdateCompanyComponent
  },
  {
    path: 'Company/delete',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: DeleteCompanyComponent
  },
  {
    path: 'UserCompany/create',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: CreateUserCompanyComponent
  },
  {
    path: 'UserCompany/list',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListCompanyEmployeesComponent
  },
  {
    path: 'UserCompany/listUserRoles',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListUserRolesComponent
  },
  {
    path: 'UserCompany/update',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: UpdateUserCompanyComponent
  },
  {
    path: 'UserCompany/delete',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: DeleteUserCompanyComponent
  },
  {
    path: 'Tag/create',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: CreateTagComponent
  },
  {
    path: 'Tag/listAll',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListTagsComponent
  },
  {
    path: 'Tag/listCompanyTags',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListCompanyTagsComponent
  },
  {
    path: 'Tag/listFolderTags',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListFolderTagsComponent
  },
  {
    path: 'Tag/listDocumentTags',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListDocumentTagsComponent
  },
  {
    path: 'Tag/update',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: UpdateTagComponent
  },
  {
    path: 'Tag/delete',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: DeleteTagComponent
  },
  {
    path: 'TagAssociation/assignFolderTag',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: AssignFolderTagComponent
  },
  {
    path: 'TagAssociation/assignDocumentTag',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: AssignDocumentTagComponent
  },
  {
    path: 'TagAssociation/unassignFolderTag',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: UnassignFolderTagComponent
  },
  {
    path: 'TagAssociation/unassignDocumentTag',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: UnassignDocumentTagComponent
  },
  {
    path: 'Folder/create',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: CreateFolderComponent
  },
  {
    path: 'Folder/listCompanyFolders',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListCompanyFoldersComponent
  },
  {
    path: 'Folder/listCompanyDeletedFolders',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListCompanyDeletedFoldersComponent
  },
  {
    path: 'Folder/update',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: UpdateFolderComponent
  },
  {
    path: 'Folder/move',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: MoveFolderComponent
  },
  {
    path: 'Folder/delete',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: DeleteFolderComponent
  },
  {
    path: 'Document/create',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: CreateDocumentComponent
  },
  {
    path: 'Document/listFolderDocuments',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListFolderDocumentsComponent
  },
  {
    path: 'Document/listFolderDeletedDocuments',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListFolderDeletedDocumentsComponent
  },
  {
    path: 'Document/update',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: UpdateDocumentComponent
  },
  {
    path: 'Document/move',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: MoveDocumentComponent
  },
  {
    path: 'Document/delete',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: DeleteDocumentComponent
  },
  {
    path: 'Linkable/folderLink',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: GenerateFolderLinkComponent
  },
  {
    path: 'Linkable/documentLink',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: GenerateDocumentLinkComponent
  },
  {
    path: 'Linkable/listFolderLinks',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListFolderLinksComponent
  },
  {
    path: 'Linkable/listDocumentLinks',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: ListDocumentLinksComponent
  },
  {
    path: 'Linkable/download',
    canActivate: [AuthenticationGuard],
    data: {permissions: {only: []}},
    component: DownloadDocumentComponent
  }
];

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'app', component: CommonComponent, children: viewsRoutes},
  {path: '**', redirectTo: '/app/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
