import { Component } from '@angular/core';
import { FolderService } from '../../services/Folder.service';
import { DocumentService } from '../../services/Document.service';
import { first, noop } from 'rxjs';
import { DocumentData } from '../../model/DocumentData';
import { FolderData } from '../../model/FolderData';
import { CompanyData } from '../../model/CompanyData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';

@Component({
  selector: 'app-move-document',
  templateUrl: './move-document.component.html',
  styleUrls: ['./move-document.component.less']
})
export class MoveDocumentComponent {
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedFolderId: number;
  folderList: FolderData[] = [];
  selectedDocumentId: number;
  documentList: DocumentData[] = [];
  selectedNewFolderId: number;

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

    const documentIdNumber: number = +this.selectedDocumentId;
    const newFolderIdNumber: number = +this.selectedNewFolderId;

      // Call the DocumentService to update the folder
      this.documentService.moveDocument(documentIdNumber, newFolderIdNumber)
        .pipe(first())
        .subscribe((result: DocumentData) => {
          if (result) {
            // Folder update was successful; navigate to a success page or home page
            this.router.navigate(['app', 'api-index']).then(() => noop());
          }
        });
    }
}

