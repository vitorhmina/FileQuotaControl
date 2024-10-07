import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
    const token = this.authenticationService.getAuthToken();

    if (token) {
      const authenticatedHttpRequest = httpRequest.clone({
        headers: httpRequest.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(authenticatedHttpRequest);
    }
    return next.handle(httpRequest);
  }
}
