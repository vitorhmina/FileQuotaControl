import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {noop} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'fqc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  private redirectRoute = ['app', 'home'];

  username: string;
  password: string;

  constructor(private readonly authenticationService: AuthenticationService, private readonly router: Router) {
    if (this.authenticationService.getUserData()) {
      this.router.navigate(this.redirectRoute).then(() => noop());
    }
  }

  // Submit Login Form
  submitForm(): void {
    this.authenticationService.login(this.username, this.password, this.redirectRoute);
  }
}
