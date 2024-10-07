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
import {UserData} from "../../model/UserData";
import {UserService} from "../../services/User.service";
import {UserCompanyService} from "../../services/UserCompany.service";
import {UserCompanyData} from "../../model/UserCompanyData";

@Component({
  selector: 'app-update-user-company',
  templateUrl: './update-user-company.component.html',
  styleUrls: ['./update-user-company.component.less']
})
export class UpdateUserCompanyComponent {
  role: string;
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedUserCompanyId: number;
  userCompanyList: UserCompanyData[] = [];

  constructor(
      private readonly userService: UserService,
      private readonly userCompanyService: UserCompanyService,
      private readonly router: Router,
      private companyService: CompanyService
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

  onUserSelect() {
    // Check if a folder is selected
    if (this.selectedUserCompanyId) {
        console.log(this.selectedUserCompanyId)
      // Call the FolderService to retrieve folder details by ID
      this.userCompanyService.getUserCompanyById(this.selectedUserCompanyId)
        .pipe(first())
        .subscribe((selectedUserCompany: UserCompanyData) => {
          // Populate the input field with the selected document's name
          this.role = selectedUserCompany ? selectedUserCompany.role : '';
        });
    } else {
      // Clear the input field if no document is selected
      this.role = '';
    }
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null

    const userCompanyIdNumber: number = +this.selectedUserCompanyId;
    if (!this.role) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      // Call the TagService to update the folder
      this.userCompanyService.updateUserCompany(userCompanyIdNumber, this.role)
        .pipe(first())
        .subscribe((result: UserCompanyData) => {
          if (result) {
            // Document update was successful; navigate to a success page or home page
            this.router.navigate(['app', 'api-index']).then(() => noop());
          }
        });
    }
  }
}

