import {Component, OnInit} from '@angular/core';
import {UserTypeData} from '../../model/UserTypeData';
import {UserTypeService} from '../../services/UserType.service';
import {first} from 'rxjs';

@Component({
  selector: 'fqc-list-user-types',
  templateUrl: './list-user-types.component.html',
  styleUrls: ['./list-user-types.component.less']
})
export class ListUserTypesComponent implements OnInit {
  userTypeList: UserTypeData[];

  constructor(private readonly userTypeService: UserTypeService) {
  }

  ngOnInit(): void {
    this.refreshUserTypeList();
  }

    private refreshUserTypeList(): void {

    this.userTypeService
        .listUserTypes()
        .pipe(first())
        .subscribe((result: UserTypeData[]) => {
          this.userTypeList = result;
        });
  }
}
