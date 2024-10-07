import { Component } from '@angular/core';
import {first, noop} from 'rxjs';
import { CompanyData } from '../../model/CompanyData';
import { FolderData } from '../../model/FolderData';
import {DocumentData} from "../../model/DocumentData";
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { FolderService } from '../../services/Folder.service';
import { DocumentService } from '../../services/Document.service';
import {document} from "ngx-bootstrap";

@Component({
    selector: 'fqc-delete-document',
    templateUrl: './delete-document.component.html',
    styleUrls: ['./delete-document.component.less']
})
export class DeleteDocumentComponent {
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedFolderId: number;
  folderList: FolderData[] = [];
  selecteDocumentId: number;
  documentList: DocumentData[] = [];


  constructor(
      private readonly folderService: FolderService,
      private readonly documentService: DocumentService,
      private readonly router: Router,
      private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.companyService
        .listUserEnrolledCompanies()
        .pipe(first())
        .subscribe((result: CompanyData[]) => {
          this.companyList = result;
        });
  }

  onCompanyChange() {
      // Check if a company is selected
      if (this.selectedCompanyId) {
          this.folderService
              .listCompanyFolders(this.selectedCompanyId)
              .pipe(first())
              .subscribe((result: FolderData[]) => {
                  this.folderList = result;
              });
      } else {
          // Clear the tag list if no company is selected
          this.folderList = [];
      }
  }

  onFolderChange() {
    // Check if a company is selected
    if (this.selectedFolderId) {
      this.documentService
        .listFolderDocuments(this.selectedFolderId)
        .pipe(first())
        .subscribe((result: DocumentData[]) => {
          this.documentList = result;
        });
    } else {
      // Clear the tag list if no company is selected
      this.documentList = [];
    }
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null
    const documentIdNumber: number = +this.selecteDocumentId;

    documentId: documentIdNumber;

      this.documentService
          .deleteDocument(documentIdNumber)
          .pipe(first())
          .subscribe(() => {
              // Document deletion was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
          });
  }
}

