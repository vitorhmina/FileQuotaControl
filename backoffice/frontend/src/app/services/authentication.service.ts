import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first, noop, Observable} from 'rxjs';
import {Settings} from '../../configuration/settings';
import {UserData} from '../model/UserData';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userData: UserData;

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    const storedData = localStorage.getItem(Settings.AUTHENTICATION);
    this.userData = storedData ? JSON.parse(storedData) : null;
  }

  // Retrieve Data Of Connected User
  getUserData(): UserData {
    return this.userData;
  }

  // Retrieve User Authentication Token
  getAuthToken(): string {
    return this.userData?.token;
  }

  // Set User Data In Local Storage And In Local Variable
  private setUserData(userData: UserData): void {
    this.userData = userData;
    localStorage.setItem(Settings.AUTHENTICATION, JSON.stringify(userData));
  }

  // Remove User Data In Local Storage And Clear Local Variable
  private removeUserData(): void {
    this.userData = null;
    localStorage.removeItem(Settings.AUTHENTICATION);
  }

  // Attempt To Perform Login
  login(username: string, password: string, redirectRoute: string[]): void {
    this.callLoginEndpoint(username, password).pipe(first()).subscribe(result => {
      this.setUserData(result);
      this.router.navigate(redirectRoute).then(() => noop());
    }, (error) => {
      console.warn('Login Failed');
    });
  }

  // Disconnect Current User
  logout(): void {
    this.callLogoutEndpoint().pipe(first()).subscribe(result => {
      this.removeUserData();
      this.router.navigate(['login']).then(() => noop());
    });
  }

  /** API CALLS **/

  private callLoginEndpoint(username: string, password: string): Observable<UserData> {
    return this.http.post<UserData>(`${Settings.API_URL}/login`, {username: username, password: password});
  }

  private callLogoutEndpoint(): Observable<void> {
    return this.http.delete<void>(`${Settings.API_URL}/logout`, {});
  }
}
