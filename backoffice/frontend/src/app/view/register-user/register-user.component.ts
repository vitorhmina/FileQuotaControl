import { Component } from '@angular/core';
import { UserService } from '../../services/User.service';
import { first, noop } from 'rxjs';
import { UserData } from '../../model/UserData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.less']
})
export class RegisterUserComponent {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(
      private readonly userService: UserService,
      private readonly router: Router
  ) {}

  onButtonClick(): void {
    // Check if any of the fields are blank or null
    if (!this.username || !this.firstName || !this.lastName || !this.email || !this.password) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      username: this.username;
      firstName: this.firstName;
      lastName: this.lastName;
      email: this.email;
      password: this.password;

      this.userService
          .registerUser(this.username, this.firstName, this.lastName, this.email, this.password)
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
