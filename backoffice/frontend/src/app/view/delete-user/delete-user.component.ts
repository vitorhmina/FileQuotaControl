import { Component } from '@angular/core';
import {first, noop} from 'rxjs';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { TagService } from "../../services/Tag.service";
import { CompanyData } from '../../model/CompanyData';
import { TagData } from "../../model/TagData";
import {UserData} from "../../model/UserData";
import {UserService} from "../../services/User.service";

@Component({
    selector: 'fqc-delete-tag',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.less']
})
export class DeleteUserComponent {
  selectedUserId: number;
  userList: UserData[] = [];

  constructor(
    private readonly router: Router,
    private readonly companyService: CompanyService,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.userService
        .listEnabledUsers()
        .pipe(first())
        .subscribe((result: UserData[]) => {
          this.userList = result;
        });
  }
  onButtonClick(): void {
    // Check if any of the fields are blank or null
    const userIdNumber: number = +this.selectedUserId;

      this.userService
          .deleteUser(userIdNumber)
          .pipe(first())
          .subscribe(() => {
              // Document deletion was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
          });
  }
}

