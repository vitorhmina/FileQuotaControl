import {Component, OnInit} from '@angular/core';
import {LinkableData} from '../../model/LinkableData';
import {DocumentData} from '../../model/DocumentData';
import {FolderData} from '../../model/FolderData';
import {CompanyData} from '../../model/CompanyData';
import {CompanyService} from '../../services/Company.service';
import { Router } from '@angular/router';
import {first} from 'rxjs';
import {FolderService} from "../../services/Folder.service";
import {LinkableService} from "../../services/Linkable.service";
import {DocumentService} from "../../services/Document.service";

@Component({
  selector: 'fqc-list-folder-links',
  templateUrl: './list-document-links.component.html',
  styleUrls: ['./list-document-links.component.less']
})
export class ListDocumentLinksComponent implements OnInit {
  selectedCompanyId: number;
  companyId: number;
  selectedFolderId: number;
  folderId: number;
  selectedDocumentId: number;
  documentId: number;
  linkableList: LinkableData[];
  companyList: CompanyData[] = [];
  folderList: FolderData[] = [];
  documentList: DocumentData[] = [];


  constructor(
      private readonly folderService: FolderService,
      private readonly documentService: DocumentService,
      private readonly router: Router,
      private readonly linkableService: LinkableService,
      private companyService: CompanyService
  ) { }


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
    // Check if a folder is selected
    if (this.selectedFolderId) {
      this.documentService
        .listFolderDocuments(this.selectedFolderId)
        .pipe(first())
        .subscribe((result: DocumentData[]) => {
          this.documentList = result;
        });
    } else {
      // Clear the linkable list if no folder is selected
      this.documentList = [];
    }
  }

  onDocumentChange() {
    // Check if a folder is selected
    if (this.selectedDocumentId) {
      this.linkableService
        .listDocumentLinks(this.selectedDocumentId)
        .pipe(first())
        .subscribe((result: LinkableData[]) => {
          this.linkableList = result;
        });
    } else {
      // Clear the linkable list if no folder is selected
      this.linkableList = [];
    }
  }
}
