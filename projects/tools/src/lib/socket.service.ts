import { Injectable } from '@angular/core';
import {environment} from 'projects/administration/src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Message} from 'projects/administration/src/app/shared/models/Message';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  url: string = environment.url + 'api/socket';

  constructor(private http: HttpClient
  ) { }

  post(data: Message) {
    return this.http.post(this.url, data)
      .map((data: Message) => { return data; })
      .catch(error => {
        return new ErrorObservable(error);
      })
      ;
  }

  getAllMessagesForUser(message) {
    return this.http.post(this.url + '/messageList', message);
  }

}
