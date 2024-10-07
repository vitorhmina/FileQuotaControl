import { Component } from '@angular/core';
import { FolderService } from '../../services/Folder.service';
import { first, noop } from 'rxjs';
import { FolderData } from '../../model/FolderData';
import { CompanyData } from '../../model/CompanyData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import {UserTypeData} from "../../model/UserTypeData";
import {UserTypeService} from "../../services/UserType.service";

@Component({
  selector: 'app-update-folder',
  templateUrl: './update-user-type.component.html',
  styleUrls: ['./update-user-type.component.less']
})
export class UpdateUserTypeComponent {
    userType: string;
    selectedUserTypeId: number;
    userTypeList: UserTypeData[] = [];

  constructor(
      private readonly userTypeService: UserTypeService,
      private readonly router: Router
  ) {}

  ngOnInit() {
    this.userTypeService
        .listUserTypes()
        .pipe(first())
        .subscribe((result: UserTypeData[]) => {
          this.userTypeList = result;
        });
  }

  onUserTypeSelect() {
    // Check if a folder is selected
    if (this.selectedUserTypeId) {
      // Call the FolderService to retrieve folder details by ID
      this.userTypeService.getUserTypeById(this.selectedUserTypeId)
        .pipe(first())
        .subscribe((selectedUserType: UserTypeData) => {
          // Populate the input field with the selected folder's name
          this.userType = selectedUserType ? selectedUserType.userType : '';
        });
    } else {
      // Clear the input field if no folder is selected
      this.userType = '';
    }
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null

    const userTypeIdNumber: number = +this.selectedUserTypeId;

    if (!this.userType) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      // Call the FolderService to update the folder
      this.userTypeService.updateUserType(userTypeIdNumber, this.userType)
        .pipe(first())
        .subscribe((result: UserTypeData) => {
          if (result) {
            // Folder update was successful; navigate to a success page or home page
            this.router.navigate(['app', 'api-index']).then(() => noop());
          }
        });
    }
  }
}

