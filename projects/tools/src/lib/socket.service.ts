import { Injectable } from '@angular/core';
import {environment} from 'projects/administration/src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Message} from 'projects/administration/src/app/shared/models/Message';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';
import {Observable} from "rxjs";
import {map} from "rxjs-compat/operator/map";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  url: string = environment.url + 'api/socket';

  constructor(private http: HttpClient
  ) { }

  post(data: Message) {
    return this.http.post(this.url, data);
  }

  getAllMessagesForUser(message) {
    return this.http.post(this.url + '/messageList', message);
  }

}
