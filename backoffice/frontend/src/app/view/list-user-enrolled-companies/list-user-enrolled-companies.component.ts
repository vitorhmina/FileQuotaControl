import {Component, OnInit} from '@angular/core';
import {CompanyData} from '../../model/CompanyData';
import {CompanyService} from '../../services/Company.service';
import {first} from 'rxjs';

@Component({
  selector: 'fqc-list-user-enrolled-companies',
  templateUrl: './list-user-enrolled-companies.component.html',
  styleUrls: ['./list-user-enrolled-companies.component.less']
})
export class ListUserEnrolledCompaniesComponent implements OnInit {
  companyList: CompanyData[];

  constructor(private readonly companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.refreshCompaniesList();
  }

    private refreshCompaniesList(): void {

    this.companyService
        .listUserEnrolledCompanies()
        .pipe(first())
        .subscribe((result: CompanyData[]) => {
          this.companyList = result;
        });
  }
}
