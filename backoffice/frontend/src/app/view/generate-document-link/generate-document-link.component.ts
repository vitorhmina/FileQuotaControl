import { Component } from '@angular/core';
import {first, noop} from 'rxjs';
import { LinkableData } from '../../model/LinkableData';
import { CompanyData } from '../../model/CompanyData';
import { FolderData } from '../../model/FolderData';
import {DocumentData} from "../../model/DocumentData";
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { FolderService } from '../../services/Folder.service';
import { DocumentService } from '../../services/Document.service';
import {LinkableService} from "../../services/Linkable.service";
import {document} from "ngx-bootstrap";

@Component({
  selector: 'app-generate-document-link',
  templateUrl: './generate-document-link.component.html',
  styleUrls: ['./generate-document-link.component.less']
})
export class GenerateDocumentLinkComponent {
  interval: number;
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedFolderId: number;
  folderList: FolderData[] = [];
  documentId: number;
  documentList: DocumentData[] = [];


  constructor(
      private readonly linkableService: LinkableService,
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
    const interval: number = +this.interval;
    const documentIdNumber: number = +this.documentId;

    if (!this.interval ) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      interval: this.interval;
      documentId: documentIdNumber;

      this.linkableService
          .generateDocumentLink(interval, documentIdNumber)
          .pipe(first())
          .subscribe((result: LinkableData) => {
            if (result) {
              // Document creation was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
            }
          });
    }
  }

  protected readonly document = document;
}

