import {Component} from '@angular/core';
import {first, noop} from 'rxjs';
import {UserData} from '../../model/UserData';
import {Router} from '@angular/router';
import {CompanyData} from "../../model/CompanyData";
import {UserCompanyService} from "../../services/UserCompany.service";
import {CompanyService} from "../../services/Company.service";
import {UserService} from "../../services/User.service";
import {UserCompanyData} from "../../model/UserCompanyData";

@Component({
  selector: 'fqc-create-user-company',
  templateUrl: './create-user-company.component.html',
  styleUrls: ['./create-user-company.component.less']
})
export class CreateUserCompanyComponent {
  role: string;
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedUserId: number;
  userList: UserData[] = [];

  constructor(private readonly companyService: CompanyService,
              private readonly router: Router,
              private readonly userCompanyService: UserCompanyService,
              private readonly userService: UserService

) {}

  ngOnInit() {
    this.companyService
        .listOwnedCompanies()
        .pipe(first())
        .subscribe((result: CompanyData[]) => {
          this.companyList = result;
        });

    this.userService
        .listUsers()
        .pipe(first())
        .subscribe((result: UserData[]) => {
          this.userList = result;
        });
  }

  onButtonClick(): void {
    const companyIdNumber: number = +this.selectedCompanyId
    const userIdNumber: number = +this.selectedUserId;

    // Check if role is blank or null before making the service call
    if (!this.role || this.role.trim() === '') {
      // Show an error message to the user, indicating that role cannot be blank
      alert('Role cannot be blank');
    } else {
      console.log('Selected User ID:', this.selectedUserId);
      console.log('Selected Company ID:', this.selectedCompanyId);
      selectedCompanyId: companyIdNumber;
      selectedUserId: userIdNumber;
      // If userType is not blank, make the service call
      this.userCompanyService.createUserCompany(this.role, userIdNumber, companyIdNumber).pipe(first()).subscribe((result: UserCompanyData) => {
        if (result) {
          this.router.navigate(['app', 'api-index']).then(() => noop());
        }
      });
    }
  }
}
