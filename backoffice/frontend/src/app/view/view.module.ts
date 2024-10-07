import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {NgxPermissionsModule} from 'ngx-permissions';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';

import {CreateUserTypeComponent} from "./create-user-type/create-user-type.component";
import {ListUserTypesComponent} from "./list-user-types/list-user-types.component";
import {UpdateUserTypeComponent} from "./update-user-type/update-user-type.component";
import {DeleteUserTypeComponent} from "./delete-user-type/delete-user-type.component";

import {CreateUserComponent} from "./create-user/create-user.component";
import {RegisterUserComponent} from "./register-user/register-user.component";
import {ListUsersComponent} from "./list-users/list-users.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {DeleteUserComponent} from "./delete-user/delete-user.component";

import {RegisterCompanyComponent} from "./register-company/register-company.component";
import {CreateCompanyComponent} from "./create-company/create-company.component";
import {ListCompaniesComponent} from "./list-companies/list-companies.component";
import {ListOwnedCompaniesComponent} from "./list-owned-companies/list-owned-companies.component";
import {ListUserEnrolledCompaniesComponent} from "./list-user-enrolled-companies/list-user-enrolled-companies.component";
import {UpdateCompanyComponent} from "./update-company/update-company.component";
import {DeleteCompanyComponent} from "./delete-company/delete-company.component";

import {CreateUserCompanyComponent} from "./create-user-company/create-user-company.component";
import {ListCompanyEmployeesComponent} from "./list-company-employees/list-company-employees.component";
import {ListUserRolesComponent} from "./list-user-roles/list-user-roles.component";
import {UpdateUserCompanyComponent} from "./update-user-company/update-user-company.component";
import {DeleteUserCompanyComponent} from "./delete-user-company/delete-user-company.component";

import {CreateTagComponent} from "./create-tag/create-tag.component";
import {ListTagsComponent} from "./list-tags/list-tags.component";
import {ListCompanyTagsComponent} from "./list-company-tags/list-company-tags.component";
import {ListFolderTagsComponent} from "./list-folder-tags/list-folder-tags.component";
import {ListDocumentTagsComponent} from "./list-document-tags/list-document-tags.component";
import {UpdateTagComponent} from "./update-tag/update-tag.component";
import {DeleteTagComponent} from "./delete-tag/delete-tag.component";

import {AssignFolderTagComponent} from "./assign-folder-tag/assign-folder-tag.component";
import {AssignDocumentTagComponent} from "./assign-document-tag/assign-document-tag.component";
import {UnassignFolderTagComponent} from "./unassign-folder-tag/unassign-folder-tag.component";
import {UnassignDocumentTagComponent} from "./unassign-document-tag/unassign-document-tag.component";

import {CreateFolderComponent} from "./create-folder/create-folder.component";
import {ListCompanyFoldersComponent} from "./list-company-folders/list-company-folders.component";
import {ListCompanyDeletedFoldersComponent} from "./list-company-deleted-folders/list-company-deleted-folders.component";
import {UpdateFolderComponent} from "./update-folder/update-folder.component";
import {MoveFolderComponent} from "./move-folder/move-folder.component";
import {DeleteFolderComponent} from "./delete-folder/delete-folder.component";

import {CreateDocumentComponent} from "./create-document/create-document.component";
import {ListFolderDocumentsComponent} from "./list-folder-documents/list-folder-documents.component";
import {ListFolderDeletedDocumentsComponent} from "./list-folder-deleted-documents/list-folder-deleted-documents.component";
import {UpdateDocumentComponent} from "./update-document/update-document.component";
import {MoveDocumentComponent} from "./move-document/move-document.component";
import {DeleteDocumentComponent} from "./delete-document/delete-document.component";

import {GenerateFolderLinkComponent} from "./generate-folder-link/generate-folder-link.component";
import {GenerateDocumentLinkComponent} from "./generate-document-link/generate-document-link.component";
import {ListFolderLinksComponent} from "./list-folder-links/list-folder-links.component";
import {ListDocumentLinksComponent} from "./list-document-links/list-document-links.component";
import {DownloadDocumentComponent} from "./download-document/download-document.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    TranslateModule.forChild(),
    NgxPermissionsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    CreateUserTypeComponent,
    ListUserTypesComponent,
    UpdateUserTypeComponent,
    DeleteUserTypeComponent,
    CreateUserComponent,
    RegisterUserComponent,
    ListUsersComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    RegisterCompanyComponent,
    CreateCompanyComponent,
    ListCompaniesComponent,
    ListOwnedCompaniesComponent,
    ListUserEnrolledCompaniesComponent,
    UpdateCompanyComponent,
    DeleteCompanyComponent,
    CreateUserCompanyComponent,
    ListCompanyEmployeesComponent,
    ListUserRolesComponent,
    UpdateUserCompanyComponent,
    DeleteUserCompanyComponent,
    CreateTagComponent,
    ListTagsComponent,
    ListCompanyTagsComponent,
    ListFolderTagsComponent,
    ListDocumentTagsComponent,
    UpdateTagComponent,
    DeleteTagComponent,
    AssignFolderTagComponent,
    AssignDocumentTagComponent,
    UnassignFolderTagComponent,
    UnassignDocumentTagComponent,
    CreateFolderComponent,
    ListCompanyFoldersComponent,
    ListCompanyDeletedFoldersComponent,
    UpdateFolderComponent,
    MoveFolderComponent,
    DeleteFolderComponent,
    CreateDocumentComponent,
    ListFolderDocumentsComponent,
    ListFolderDeletedDocumentsComponent,
    UpdateDocumentComponent,
    MoveDocumentComponent,
    DeleteDocumentComponent,
    GenerateFolderLinkComponent,
    GenerateDocumentLinkComponent,
    ListFolderLinksComponent,
    ListDocumentLinksComponent,
    DownloadDocumentComponent,
    LoginComponent,
    LogoutComponent
  ]
})
export class ViewModule {
}
