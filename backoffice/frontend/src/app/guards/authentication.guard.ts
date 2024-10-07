import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {noop} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {
  constructor(private readonly authenticationService: AuthenticationService, private readonly router: Router) {
  }

  canActivate(): boolean {
    const userData = this.authenticationService.getUserData();

    if (userData && userData.token) {
      return true;
    } else {
      // Redirect To Login If Not Connected
      this.router.navigate(['login']).then(() => noop());
      return false;
    }
  }
}
