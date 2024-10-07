import {Component, OnInit} from '@angular/core';
import {CompanyData} from '../../model/CompanyData';
import {CompanyService} from '../../services/Company.service';
import {first} from 'rxjs';

@Component({
  selector: 'fqc-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.less']
})
export class ListCompaniesComponent implements OnInit {
  companyList: CompanyData[];

  constructor(private readonly companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.refreshCompaniesList();
  }

    private refreshCompaniesList(): void {

    this.companyService
        .listCompanies()
        .pipe(first())
        .subscribe((result: CompanyData[]) => {
          this.companyList = result;
        });
  }
}
