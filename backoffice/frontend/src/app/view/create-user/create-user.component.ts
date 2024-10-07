import { Component } from '@angular/core';
import { UserService } from '../../services/User.service';
import { first, noop } from 'rxjs';
import { UserData } from '../../model/UserData';
import { UserTypeData } from '../../model/UserTypeData';
import { Router } from '@angular/router';
import { UserTypeService } from '../../services/UserType.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})
export class CreateUserComponent {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userTypeId: number;
  userTypeList: UserTypeData[] = [];

  constructor(
      private readonly userService: UserService,
      private readonly router: Router,
      private userTypeService: UserTypeService
  ) {}

  ngOnInit() {
    this.userTypeService
        .listUserTypes()
        .pipe(first())
        .subscribe((result: UserTypeData[]) => {
          this.userTypeList = result;
        });
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null

    const userTypeIdNumber: number = +this.userTypeId;

    if (!this.username || !this.firstName || !this.lastName || !this.email || !this.password || !this.userTypeId) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {

        username: this.username;
        firstName: this.firstName;
        lastName: this.lastName;
        email: this.email;
        password: this.password;
        userTypeId: userTypeIdNumber;

      this.userService
          .createUser(this.username, this.firstName, this.lastName, this.email, this.password, userTypeIdNumber)
          .pipe(first())
          .subscribe((result: UserData) => {
            if (result) {
              // User creation was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
            }
          });
    }
  }
}

