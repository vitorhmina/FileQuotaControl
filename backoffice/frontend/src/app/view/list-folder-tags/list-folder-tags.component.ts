import {Component, OnInit} from '@angular/core';
import {TagData} from '../../model/TagData';
import {CompanyData} from '../../model/CompanyData';
import {TagService} from '../../services/Tag.service';
import {CompanyService} from '../../services/Company.service';
import { Router } from '@angular/router';
import {first} from 'rxjs';
import {FolderService} from "../../services/Folder.service";
import {FolderData} from "../../model/FolderData";

@Component({
  selector: 'fqc-list-tags',
  templateUrl: './list-folder-tags.component.html',
  styleUrls: ['./list-folder-tags.component.less']
})
export class ListFolderTagsComponent implements OnInit {
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedFolderId: number;
  folderList: FolderData[] = [];
  tagList: TagData[] = [];

  constructor(
      private readonly tagService: TagService,
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
      this.tagService
          .listFolderTags(this.selectedFolderId)
          .pipe(first())
          .subscribe((result: TagData[]) => {
            this.tagList = result;
          });
    } else {
      // Clear the tag list if no company is selected
      this.tagList = [];
    }
  }


}
