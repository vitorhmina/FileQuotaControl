import {Component, OnInit} from '@angular/core';
import {TagData} from '../../model/TagData';
import {CompanyData} from '../../model/CompanyData';
import {TagService} from '../../services/Tag.service';
import {CompanyService} from '../../services/Company.service';
import { Router } from '@angular/router';
import {first} from 'rxjs';

@Component({
  selector: 'fqc-list-tags',
  templateUrl: './list-company-tags.component.html',
  styleUrls: ['./list-company-tags.component.less']
})
export class ListCompanyTagsComponent implements OnInit {
  selectedCompanyId: number;
  companyId: number;
  tagList: TagData[];
  companyList: CompanyData[] = [];

  constructor(
      private readonly tagService: TagService,
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
