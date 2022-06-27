import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST } from '../constants/urls';
import { AuthUser } from '../models/auth-user';
import { AuthUserResponse } from '../models/auth-user-response';
import { BaseResponse } from '../models/base-response';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';
import { UsersResponse } from '../models/users-response';


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
    return this.http.post<AuthUserResponse>(HOST + '/users/auth', user);
  }

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(HOST + '/users');
  }

  deleteUser(userId): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(HOST + '/users/' + userId);
  }
}
