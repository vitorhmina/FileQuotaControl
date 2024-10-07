import { Component, OnInit } from '@angular/core';
import { UserData } from '../../model/UserData';
import { UserService } from '../../services/User.service';
import { first } from 'rxjs';

@Component({
  selector: 'fqc-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.less']
})
export class ListUsersComponent implements OnInit {
  userList: UserData[];

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.refreshUserList();
  }

  private refreshUserList(): void {
    this.userService
      .listUsers()
      .pipe(first())
      .subscribe((result: UserData[]) => {
        this.userList = result;
      });
  }
}
