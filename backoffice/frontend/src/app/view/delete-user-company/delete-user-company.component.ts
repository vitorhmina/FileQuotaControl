import { Component } from '@angular/core';
import {first, noop} from 'rxjs';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { TagService } from "../../services/Tag.service";
import { CompanyData } from '../../model/CompanyData';
import { TagData } from "../../model/TagData";
import {UserCompanyData} from "../../model/UserCompanyData";
import {UserCompanyService} from "../../services/UserCompany.service";

@Component({
    selector: 'fqc-delete-tag',
    templateUrl: './delete-user-company.component.html',
    styleUrls: ['./delete-user-company.component.less']
})
export class DeleteUserCompanyComponent {
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
    selectedUserCompanyId: number;
    userCompanyList: UserCompanyData[] = [];

  constructor(
    private readonly router: Router,
    private readonly companyService: CompanyService,
    private readonly userCompanyService: UserCompanyService
  ) {}

  ngOnInit() {
    this.companyService
        .listOwnedCompanies()
        .pipe(first())
        .subscribe((result: CompanyData[]) => {
          this.companyList = result;
        });
  }

  onCompanyChange() {
      // Check if a company is selected
      if (this.selectedCompanyId) {
          this.userCompanyService
              .listUsersInCompany(this.selectedCompanyId)
              .pipe(first())
              .subscribe((result: UserCompanyData[]) => {
                  this.userCompanyList = result;
              });
      } else {
          // Clear the tag list if no company is selected
          this.userCompanyList = [];
      }
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null
    const userCompanyIdNumber: number = +this.selectedUserCompanyId;

      this.userCompanyService
          .deleteUserCompany(userCompanyIdNumber)
          .pipe(first())
          .subscribe(() => {
              // Document deletion was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
          });
  }
}

