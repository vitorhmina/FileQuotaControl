import {Component, OnInit} from '@angular/core';
import {UserCompanyData} from '../../model/UserCompanyData';
import {CompanyData} from '../../model/CompanyData';
import {UserCompanyService} from '../../services/UserCompany.service';
import {CompanyService} from '../../services/Company.service';
import { Router } from '@angular/router';
import {first} from 'rxjs';

@Component({
  selector: 'fqc-list-tags',
  templateUrl: './list-company-employees.component.html',
  styleUrls: ['./list-company-employees.component.less']
})
export class ListCompanyEmployeesComponent implements OnInit {
  selectedCompanyId: number;
  companyId: number;
  userCompanyList: UserCompanyData[];
  companyList: CompanyData[] = [];

  constructor(
      private readonly userCompanyService: UserCompanyService,
      private readonly router: Router,
      private companyService: CompanyService
  ) { }


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


}
