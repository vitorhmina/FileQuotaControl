import {Component} from '@angular/core';
import {UserTypeService} from '../../services/UserType.service';
import {first, noop} from 'rxjs';
import {UserTypeData} from '../../model/UserTypeData';
import {Router} from '@angular/router';

@Component({
  selector: 'fqc-create-user-type',
  templateUrl: './create-user-type.component.html',
  styleUrls: ['./create-user-type.component.less']
})
export class CreateUserTypeComponent {
  userType: string;

  constructor(private readonly userTypeService: UserTypeService, private readonly router: Router) {
  }

  onButtonClick(): void {
    // Check if userType is blank or null before making the service call
    if (!this.userType || this.userType.trim() === '') {
      // Show an error message to the user, indicating that userType cannot be blank
      alert('User Type cannot be blank');
    } else {
      // If userType is not blank, make the service call
      this.userTypeService.createUserType(this.userType).pipe(first()).subscribe((result: UserTypeData) => {
        if (result) {
          this.router.navigate(['app', 'api-index']).then(() => noop());
        }
      });
    }
  }
}
