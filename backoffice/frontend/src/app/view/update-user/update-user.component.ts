import { Component } from '@angular/core';
import { FolderService } from '../../services/Folder.service';
import { first, noop } from 'rxjs';
import { UserTypeData } from '../../model/UserTypeData';
import { CompanyData } from '../../model/CompanyData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import {UserData} from "../../model/UserData";
import {DocumentService} from "../../services/Document.service";
import {TagData} from "../../model/TagData";
import {TagService} from "../../services/Tag.service";
import {UserService} from "../../services/User.service";
import {UserTypeService} from "../../services/UserType.service";

@Component({
  selector: 'app-update-tag',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.less']
})
export class UpdateUserComponent {
    selectedUserId: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userList: UserData[] = [];

  constructor(
      private readonly router: Router,
      private userService: UserService
  ) {}

  ngOnInit() {
    this.userService
        .listUsers()
        .pipe(first())
        .subscribe((result: UserData[]) => {
          this.userList = result;
        });
  }

  onUserSelect() {
    // Check if a folder is selected
    if ( !this.username || !this.firstName || !this.lastName || !this.email || !this.password) {
      // Call the FolderService to retrieve folder details by ID
      this.userService.getUserById(this.selectedUserId)
        .pipe(first())
        .subscribe((selectedUser: UserData) => {
          // Populate the input field with the selected document's name
          this.username = selectedUser ? selectedUser.username : '';
          this.firstName = selectedUser ? selectedUser.firstName : '';
            this.lastName = selectedUser ? selectedUser.lastName : '';
            this.email = selectedUser ? selectedUser.email : '';
        });
    } else {
      // Clear the input field if no document is selected
      this.username = '';
      this.firstName = '';
        this.lastName = '';
        this.email = '';
    }
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null

    const userIdNumber: number = +this.selectedUserId;

    if ( !this.username || !this.firstName || !this.lastName || !this.email || !this.password) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      // Call the TagService to update the folder
      this.userService.updateUser(userIdNumber, this.username ,this.firstName ,this.lastName ,this.email ,this.password)
        .pipe(first())
        .subscribe((result: UserData) => {
          if (result) {
            // Document update was successful; navigate to a success page or home page
            this.router.navigate(['app', 'api-index']).then(() => noop());
          }
        });
    }
  }
}

