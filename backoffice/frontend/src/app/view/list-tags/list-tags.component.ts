import {Component, OnInit} from '@angular/core';
import {TagData} from '../../model/TagData';
import {TagService} from '../../services/Tag.service';
import {first} from 'rxjs';
import {CompanyData} from "../../model/CompanyData";
import {FolderData} from "../../model/FolderData";
import {CompanyService} from "../../services/Company.service";
import {FolderService} from "../../services/Folder.service";

@Component({
  selector: 'fqc-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.less']
})
export class ListTagsComponent implements OnInit {
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  tagList: TagData[];

  constructor(
      private readonly tagService: TagService,
      private readonly folderService: FolderService,
      private companyService: CompanyService,

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
      this.tagService
          .listCompanyTags(this.selectedCompanyId)
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
