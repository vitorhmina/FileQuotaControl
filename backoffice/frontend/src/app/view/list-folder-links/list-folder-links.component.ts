import {Component, OnInit} from '@angular/core';
import {LinkableData} from '../../model/LinkableData';
import {FolderData} from '../../model/FolderData';
import {CompanyData} from '../../model/CompanyData';
import {CompanyService} from '../../services/Company.service';
import { Router } from '@angular/router';
import {first} from 'rxjs';
import {FolderService} from "../../services/Folder.service";
import {LinkableService} from "../../services/Linkable.service";

@Component({
  selector: 'fqc-list-folder-links',
  templateUrl: './list-folder-links.component.html',
  styleUrls: ['./list-folder-links.component.less']
})
export class ListFolderLinksComponent implements OnInit {
  selectedCompanyId: number;
  companyId: number;
  selectedFolderId: number;
  folderId: number;
  linkableList: LinkableData[];
  companyList: CompanyData[] = [];
  folderList: FolderData[] = [];

  constructor(
      private readonly folderService: FolderService,
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
      this.linkableService
        .listFolderLinks(this.selectedFolderId)
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
