import { Component } from '@angular/core';
import { FolderService } from '../../services/Folder.service';
import { first, noop } from 'rxjs';
import { FolderData } from '../../model/FolderData';
import { CompanyData } from '../../model/CompanyData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import {DocumentData} from "../../model/DocumentData";
import {DocumentService} from "../../services/Document.service";

@Component({
  selector: 'app-update-folder',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.less']
})
export class UpdateDocumentComponent {
    name: string;
  description: string;
  selectedCompanyId: number;
    companyList: CompanyData[] = [];
    selectedFolderId: number;
    folderList: FolderData[] = [];
  selectedDocumentId: number;
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

  onDocumentSelect() {
    // Check if a folder is selected
    if (this.selectedDocumentId) {
      // Call the FolderService to retrieve folder details by ID
      this.documentService.getDocumentById(this.selectedDocumentId)
        .pipe(first())
        .subscribe((selectedDocument: DocumentData) => {
          // Populate the input field with the selected document's name
          this.name = selectedDocument ? selectedDocument.name : '';
          this.description = selectedDocument ? selectedDocument.description : '';
        });
    } else {
      // Clear the input field if no document is selected
      this.name = '';
      this.description = '';
    }
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null

    const documentIdNumber: number = +this.selectedDocumentId;

    if (!this.name || !this.description) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      // Call the DocumentService to update the folder
      this.documentService.updateDocument(documentIdNumber, this.name, this.description)
        .pipe(first())
        .subscribe((result: DocumentData) => {
          if (result) {
            // Document update was successful; navigate to a success page or home page
            this.router.navigate(['app', 'api-index']).then(() => noop());
          }
        });
    }
  }
}

