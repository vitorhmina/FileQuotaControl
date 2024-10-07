import {Component, OnInit} from '@angular/core';
import {DocumentData} from '../../model/DocumentData';
import {FolderData} from '../../model/FolderData';
import {CompanyData} from '../../model/CompanyData';
import {DocumentService} from '../../services/Document.service';
import {FolderService} from '../../services/Folder.service';
import {CompanyService} from '../../services/Company.service';
import { Router } from '@angular/router';
import {first} from 'rxjs';

@Component({
  selector: 'fqc-list-folder-documents',
  templateUrl: './list-folder-documents.component.html',
  styleUrls: ['./list-folder-documents.component.less']
})
export class ListFolderDocumentsComponent implements OnInit {
  selectedCompanyId: number;
  companyId: number;
  selectedFolderId: number;
  folderId: number;
  documentList: DocumentData[];
  folderList: FolderData[] = [];
  companyList: CompanyData[] = [];

  constructor(
      private readonly documentService: DocumentService,
      private readonly folderService: FolderService,
      private readonly router: Router,
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
}
