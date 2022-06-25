import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST } from '../constants/urls';
import { AuthUser } from '../models/auth-user';
import { AuthUserResponse } from '../models/auth-user-response';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userId): Observable<UserResponse> {
    return this.http.get<UserResponse>(HOST + '/users/' + userId);
  }

  createUser(user: User): Observable<AuthUserResponse> {
    return this.http.post<AuthUserResponse>(HOST + '/users/', user);
  }

  authUser(user: AuthUser): Observable<AuthUserResponse> {
    return this.http.post<AuthUserResponse>(HOST + '/users/auth', user)
  }
}
