import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'fqc-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less']
})
export class LogoutComponent {
  constructor(private readonly router: Router, private readonly authenticationService: AuthenticationService) {
    this.authenticationService.logout();
  }
}
