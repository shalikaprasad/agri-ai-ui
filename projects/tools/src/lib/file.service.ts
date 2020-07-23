import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class FileService {


  private adminBaseUrl = 'http://localhost:8082/api/file';
  private pathUrl = 'assets/images/';
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getImageBasePath() {
    return this.pathUrl;
  }

  uploadImage(fileData, type) {
    const data: FormData = new FormData();
    data.append('file', fileData);
    data.append('image_type', type);
    return this.http.post(this.adminBaseUrl + '/uploadImage?access_token=' + this.authenticationService.getAccessToken() , data);
  }
}
