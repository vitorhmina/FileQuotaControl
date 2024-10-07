import { Component } from '@angular/core';
import { FolderService } from '../../services/Folder.service';
import { first, noop } from 'rxjs';
import { FolderData } from '../../model/FolderData';
import { CompanyData } from '../../model/CompanyData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import {DocumentData} from "../../model/DocumentData";
import {DocumentService} from "../../services/Document.service";
import {TagData} from "../../model/TagData";
import {TagService} from "../../services/Tag.service";

@Component({
  selector: 'app-update-tag',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.less']
})
export class UpdateCompanyComponent {
  title: string;
  quota: string;
  selectedCompanyId: number;
  companyList: CompanyData[] = [];

  constructor(
      private readonly tagService: TagService,
      private readonly router: Router,
      private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.companyService
        .listCompanies()
        .pipe(first())
        .subscribe((result: CompanyData[]) => {
          this.companyList = result;
        });
  }

  onCompanySelect() {
    // Check if a folder is selected
    if (this.selectedCompanyId) {
      // Call the FolderService to retrieve folder details by ID
      this.companyService.getCompanyById(this.selectedCompanyId)
        .pipe(first())
        .subscribe((selectedCompany: CompanyData) => {
          // Populate the input field with the selected document's name
          this.title = selectedCompany ? selectedCompany.title : '';
          this.quota = selectedCompany ? selectedCompany.quota.toString() : '';
        });
    } else {
      // Clear the input field if no document is selected
      this.title = '';
      this.quota = '';
    }
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null

    const companyIdNumber: number = +this.selectedCompanyId;

    if (!this.title || !this.quota) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      // Call the TagService to update the folder
      this.companyService.updateCompany(companyIdNumber, this.title, this.quota)
        .pipe(first())
        .subscribe((result: CompanyData) => {
          if (result) {
            // Document update was successful; navigate to a success page or home page
            this.router.navigate(['app', 'api-index']).then(() => noop());
          }
        });
    }
  }
}

