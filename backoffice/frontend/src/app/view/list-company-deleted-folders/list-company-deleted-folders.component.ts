import {Component, OnInit} from '@angular/core';
import {FolderData} from '../../model/FolderData';
import {CompanyData} from '../../model/CompanyData';
import {FolderService} from '../../services/Folder.service';
import {CompanyService} from '../../services/Company.service';
import { Router } from '@angular/router';
import {first} from 'rxjs';

@Component({
  selector: 'fqc-list-company-folders',
  templateUrl: './list-company-deleted-folders.component.html',
  styleUrls: ['./list-company-deleted-folders.component.less']
})
export class ListCompanyDeletedFoldersComponent implements OnInit {
  selectedCompanyId: number;
  selectedFolderId: number;
  companyId: number;
  folderList: FolderData[];
  deletedFolderList: FolderData[];
  companyList: CompanyData[] = [];

  constructor(
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
      this.folderService
          .listCompanyDeletedFolders(this.selectedFolderId)
          .pipe(first())
          .subscribe((result: FolderData[]) => {
            this.deletedFolderList = result;
          });
    } else {
      // Clear the tag list if no company is selected
      this.deletedFolderList = [];
    }
  }
}
