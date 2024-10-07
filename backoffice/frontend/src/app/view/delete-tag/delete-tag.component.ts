import { Component } from '@angular/core';
import {first, noop} from 'rxjs';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { TagService } from "../../services/Tag.service";
import { CompanyData } from '../../model/CompanyData';
import { TagData } from "../../model/TagData";

@Component({
    selector: 'fqc-delete-tag',
    templateUrl: './delete-tag.component.html',
    styleUrls: ['./delete-tag.component.less']
})
export class DeleteTagComponent {
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedTagId: number;
  tagList: TagData[] = [];

  constructor(
    private readonly router: Router,
    private readonly companyService: CompanyService,
    private readonly tagService: TagService
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

  onButtonClick(): void {
    // Check if any of the fields are blank or null
    const tagIdNumber: number = +this.selectedTagId;

    tagId: tagIdNumber;

      this.tagService
          .deleteTag(tagIdNumber)
          .pipe(first())
          .subscribe(() => {
              // Document deletion was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
          });
  }
}

