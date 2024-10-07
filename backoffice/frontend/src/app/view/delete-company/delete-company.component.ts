import { Component } from '@angular/core';
import {first, noop} from 'rxjs';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { TagService } from "../../services/Tag.service";
import { CompanyData } from '../../model/CompanyData';
import { TagData } from "../../model/TagData";

@Component({
    selector: 'fqc-delete-tag',
    templateUrl: './delete-company.component.html',
    styleUrls: ['./delete-company.component.less']
})
export class DeleteCompanyComponent {
  selectedCompanyId: number;
  companyList: CompanyData[] = [];

  constructor(
    private readonly router: Router,
    private readonly companyService: CompanyService,
    private readonly tagService: TagService
  ) {}

  ngOnInit() {
    this.companyService
        .listCompanies()
        .pipe(first())
        .subscribe((result: CompanyData[]) => {
          this.companyList = result;
        });
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null
    const companyIdNumber: number = +this.selectedCompanyId;

      this.companyService
          .deleteCompany(companyIdNumber)
          .pipe(first())
          .subscribe(() => {
              // Document deletion was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
          });
  }
}

