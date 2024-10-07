import {Component, OnInit} from '@angular/core';
import {CompanyData} from '../../model/CompanyData';
import {CompanyService} from '../../services/Company.service';
import {first} from 'rxjs';

@Component({
  selector: 'fqc-list-owned-companies',
  templateUrl: './list-owned-companies.component.html',
  styleUrls: ['./list-owned-companies.component.less']
})
export class ListOwnedCompaniesComponent implements OnInit {
  companyList: CompanyData[];

  constructor(private readonly companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.refreshCompaniesList();
  }

    private refreshCompaniesList(): void {

    this.companyService
        .listOwnedCompanies()
        .pipe(first())
        .subscribe((result: CompanyData[]) => {
          this.companyList = result;
        });
  }
}
