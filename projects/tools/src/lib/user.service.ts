import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';
import {Farmer} from 'projects/administration/src/app/shared/models/Farmer';
import {Crop} from 'projects/administration/src/app/shared/models/Crop';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8082/api/user';
  private fd: any;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService
  ) { }

  getUser() {
    return this.http.get(this.baseUrl + '/getUser?access_token=' + this.authenticationService.getAccessToken());
  }

  getAllUsers() {
    return this.http.get(this.baseUrl + '/getAllUsers?access_token=' + this.authenticationService.getAccessToken());
  }

  deleteUser(id) {
    this.fd = this.authenticationService.getAccessToken();
    return this.http.get(this.baseUrl + '/deleteUser?access_token=' + this.fd + '&userId=' + id.toString());
  }


  updateUser(user) {
    return this.http.post(this.baseUrl + '/createUser?access_token=' + this.authenticationService.getAccessToken(), user);
  }

  getAllFarmers() {
    return this.http.get(this.baseUrl + '/getAllFarmers?access_token=' + this.authenticationService.getAccessToken());
  }

  deleteFarmer(id) {
    this.fd = this.authenticationService.getAccessToken();
    return this.http.get(this.baseUrl + '/deleteFarmer?access_token=' + this.fd + '&farmerId=' + id.toString());
  }

  updateFarmer(farmer: Farmer) {
    return this.http.post(this.baseUrl + '/createFarmer?access_token=' + this.authenticationService.getAccessToken(), farmer);
  }
}
