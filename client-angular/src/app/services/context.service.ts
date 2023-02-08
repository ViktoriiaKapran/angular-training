import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(private cookieService: CookieService) { }

  getUser(): User {
    return JSON.parse(localStorage.getItem('current-user'));
  }

  setUser(user: User) {
    localStorage.setItem('current-user', JSON.stringify(user));
  }

  getAuthToken() {
    return this.cookieService.get('auth-token');
  }

  setAuthToken(token: string) {
    this.cookieService.set('auth-token', token);
  }
}
