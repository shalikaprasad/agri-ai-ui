import { Injectable } from '@angular/core';
import {News} from 'projects/public-user/src/app/shared/models/News';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public news: News[];
  private baseUrl = 'http://localhost:8084/api/news';
  private adminBaseUrl = 'http://localhost:8082/api/news';
  private fd: any;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getNewsList(count) {
    const params = new URLSearchParams();
    params.append('count', count);

    return this.http.get(`${this.baseUrl}/getNewsListByCount/` + count);
  }

  deleteNews(id) {
    this.fd = this.authenticationService.getAccessToken();
    return this.http.get(this.adminBaseUrl + '/deleteNews?access_token=' + this.fd + '&newsId=' + id.toString());
  }

  updateNews(news) {
    return this.http.post(this.adminBaseUrl + '/updateNews?access_token=' + this.authenticationService.getAccessToken() , news);
  }
}

