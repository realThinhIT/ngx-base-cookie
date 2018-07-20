import { Injectable } from '@angular/core';
import { BaseCookieService } from './base-cookie.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserCookieService extends BaseCookieService {

  constructor(
    cookieService: CookieService
  ) { 
    super(cookieService);
  }

  namespace = `user`;

  public updateLoginToken(token = ``) {
    this.save('loginToken', token);
  }

  public getLoginToken() {
    return this.get('loginToken');
  }

}
