import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  private baseUrl = 'http://localhost:8082/api/crop';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  public getCrop(id) {
    const fd = this.authenticationService.getAccessToken();
    return this.http.get(this.baseUrl + '/getCropById?access_token=' + fd + '&cropId=' + id.toString());
  }

  public getAllCrops() {
    return this.http.get(this.baseUrl + '/getAllCrops?access_token=' + this.authenticationService.getAccessToken());
  }

  public getAllCropNames() {
    return this.http.get(this.baseUrl + '/getAllCropNames?access_token=' + this.authenticationService.getAccessToken());
  }

  public updateCrop(crop) {
    return this.http.post(this.baseUrl + '/updateCrop?access_token=' + this.authenticationService.getAccessToken(), crop);
  }

  public deleteCrop(id) {
    const fd = this.authenticationService.getAccessToken();
    return this.http.get(this.baseUrl + '/deleteCrop?access_token=' + fd + '&cropId=' + id.toString());
  }
}
