import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8082/api/project';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  public createProject(project) {
    return this.http.post(this.baseUrl + '/createProject?access_token=' + this.authenticationService.getAccessToken(), project);
  }

  public getProjectsForUser(userId) {
    return this.http.post(this.baseUrl + '/getProjectsForUser?access_token=' + this.authenticationService.getAccessToken(), userId);
  }

  public getProjectById(projectId) {
    return this.http.post(this.baseUrl + '/getProjectById?access_token=' + this.authenticationService.getAccessToken(), projectId);
  }

  public getAllProjects() {
    return this.http.get(this.baseUrl + '/getAllProjects?access_token=' + this.authenticationService.getAccessToken());
  }

  public updateProject(project) {
    return this.http.post(this.baseUrl + '/updateProject?access_token=' + this.authenticationService.getAccessToken(), project);
  }

  public deleteProject(id) {
    return this.http.post(this.baseUrl + '/deleteProject?access_token=' + this.authenticationService.getAccessToken(), id);
  }

  public getProjectsForRequiredMonth() {
    return this.http.get(this.baseUrl + '/getProjectsForRequiredMonth?access_token=' + this.authenticationService.getAccessToken());
  }

  public getProjectCountByFarmerID() {
    return this.http.get(this.baseUrl + '/getProjectCountByFarmerID?access_token=' + this.authenticationService.getAccessToken());
  }

  public getCropCounts() {
    return this.http.get(this.baseUrl + '/getCropCounts?access_token=' + this.authenticationService.getAccessToken());
  }

  public getProfitCounts() {
    return this.http.get(this.baseUrl + '/getProfitCounts?access_token=' + this.authenticationService.getAccessToken());
  }
}
