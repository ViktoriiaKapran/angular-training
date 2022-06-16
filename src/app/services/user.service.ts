import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST } from '../constants/urls';
import { UserResponse } from '../models/user-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userId): Observable<UserResponse> {
    return this.http.get<UserResponse>(HOST + '/users/' + userId);
  }
}
