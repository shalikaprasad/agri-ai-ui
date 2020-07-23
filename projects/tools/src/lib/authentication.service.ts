import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from 'projects/public-user/src/app/shared/models/User';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;
  private baseUrl = 'http://localhost:8081/oauth';

  constructor(private http: HttpClient) {
    // if (this.isUserLoggedIn()) {
    //   this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    //   this.currentUser = this.currentUserSubject.asObservable();
    // }
  }

  // public get currentUserValue(): User {
  //   if (this.currentUserSubject != null) { return this.currentUserSubject.value; }
  // }

  login(user) {
    const params = new URLSearchParams();
    params.append('username', user.userName);
    params.append('password', user.password);
    params.append('grant_type', 'password');

    const headers = {
      Authorization: 'Basic ' + btoa('prediction_system:pin'),
      'Content-type': 'application/x-www-form-urlencoded'
    };

    return this.http.post(`${this.baseUrl}/token`, params.toString(), {headers});
  }

  logOut() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUserName');
    // this.currentUserSubject.next(null);
  }

  isUserLoggedIn() {
    const userName = localStorage.getItem('currentUserName');
    return !(userName === 'undefined' || userName === null);
  }

  getAccessToken() {
    if (this.isUserLoggedIn()) {
      return JSON.parse(window.sessionStorage.getItem('token')).access_token;
    } else {
      return null;
    }
  }

}
