import {Component, OnInit} from '@angular/core';
import {UserCompanyData} from '../../model/UserCompanyData';
import {UserCompanyService} from '../../services/UserCompany.service';
import { Router } from '@angular/router';
import {first} from 'rxjs';

@Component({
  selector: 'fqc-list-user-roles',
  templateUrl: './list-user-roles.component.html',
  styleUrls: ['./list-user-roles.component.less']
})
export class ListUserRolesComponent implements OnInit {
  companyId: number;
  userCompanyList: UserCompanyData[];

  constructor(
      private readonly userCompanyService: UserCompanyService,
      private readonly router: Router,
  ) { }


  ngOnInit() {
    this.userCompanyService
      .listUserRoles()
      .pipe(first())
      .subscribe((result: UserCompanyData[]) => {
        this.userCompanyList = result;
      });
  }
}
