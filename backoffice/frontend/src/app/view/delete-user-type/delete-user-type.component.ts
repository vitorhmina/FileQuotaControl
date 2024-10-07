import { Component } from '@angular/core';
import {first, noop} from 'rxjs';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { UserTypeService } from "../../services/UserType.service";
import { CompanyData } from '../../model/CompanyData';
import { UserTypeData } from "../../model/UserTypeData";

@Component({
    selector: 'fqc-delete-user-type',
    templateUrl: './delete-user-type.component.html',
    styleUrls: ['./delete-user-type.component.less']
})
export class DeleteUserTypeComponent {
  selectedUserTypeId: number;
  userTypeList: UserTypeData[] = [];

  constructor(
    private readonly router: Router,
    private readonly companyService: CompanyService,
    private readonly userTypeService: UserTypeService
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
    const userTypeIdNumber: number = +this.selectedUserTypeId;

    userTypeId: userTypeIdNumber;

      this.userTypeService
          .deleteUserType(userTypeIdNumber)
          .pipe(first())
          .subscribe(() => {
              // Document deletion was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
          });
  }
}

