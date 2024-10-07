import { Component } from '@angular/core';
import { TagService } from '../../services/Tag.service';
import {first, interval, noop} from 'rxjs';
import { TagAssociationData } from '../../model/TagAssociationData';
import { CompanyData } from '../../model/CompanyData';
import { FolderData } from '../../model/FolderData';
import { DocumentData } from '../../model/DocumentData';
import { TagData } from '../../model/TagData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { FolderService } from '../../services/Folder.service';
import { DocumentService } from '../../services/Document.service';
import {TagAssociationService} from "../../services/TagAssociation.service";

@Component({
  selector: 'app-assign-document-tag',
  templateUrl: './assign-document-tag.component.html',
  styleUrls: ['./assign-document-tag.component.less']
})
export class AssignDocumentTagComponent {
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedFolderId: number;
  folderList: FolderData[] = [];
  documentId: number;
  documentList: DocumentData[] = [];
  tagId: number;
  tagList: TagData[] = [];


  constructor(
      private readonly tagAssociationService: TagAssociationService,
      private readonly tagService: TagService,
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
        this.tagService
          .listCompanyTags(this.selectedCompanyId)
          .pipe(first())
          .subscribe((result: TagData[]) => {
            this.tagList = result;
          });
      } else {
          // Clear the tag list if no company is selected
        this.folderList = [];
        this.tagList = [];
      }
  }

  onFolderChange() {
    // Check if a company is selected
    if (this.selectedCompanyId) {
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
    const tagIdNumber: number = +this.tagId;
    const documentIdNumber: number = +this.documentId;

    tagId: tagIdNumber;
    documentId: documentIdNumber;

    this.tagAssociationService
        .assignDocumentTag(tagIdNumber, documentIdNumber)
        .pipe(first())
        .subscribe((result: TagAssociationData) => {
          if (result) {
            // Document creation was successful; navigate to a success page or home page
            this.router.navigate(['app', 'api-index']).then(() => noop());
          }
        });
  }
}

