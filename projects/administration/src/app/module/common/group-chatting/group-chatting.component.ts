import { Component, OnInit } from '@angular/core';
import {User} from 'projects/administration/src/app/shared/models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {FileService} from 'projects/tools/src/lib/file.service';
import {FormBuilder} from '@angular/forms';
import {UserService} from 'projects/tools/src/lib/user.service';
import {AlertService} from 'projects/tools/src/lib/alert.service';
import {Message} from 'projects/administration/src/app/shared/models/Message';
import {SocketService} from 'projects/tools/src/lib/socket.service';
import * as SockJS from 'sockjs-client';
import {environment} from 'projects/administration/src/environments/environment';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';
import {DatePipe} from '@angular/common';
import {first} from 'rxjs/operators';
import {Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-group-chatting',
  templateUrl: './group-chatting.component.html',
  styleUrls: ['./group-chatting.component.scss']
})
export class GroupChattingComponent implements OnInit {

  userList: User[] = null;
  public baseImagePath: any;
  activeUser: User = new User();
  loggedUser: User = new User();
  messageText: any;
  private serverUrl = environment.url + 'socket';
  isLoaded = false;
  isCustomSocketOpened = false;
  private stompClient;
  messages: Message[] = [];
  totalMessage: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private fileService: FileService,
    private socketService: SocketService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe
    // private toastr: ToastrService
  ) {
    this.baseImagePath = fileService.getImageBasePath() + 'user';
  }

  ngOnInit() {
    this.reloadData();
    this.initializeWebSocketConnection();
    setTimeout(() => {
      this.openSocket();
    }, 5000);
  }

  reloadData() {
    this.userService.getAllUsers().subscribe((res) => {
        this.userList = res['body'];
        let turn = 0;
        this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
        for (const user of this.userList) {
          if (this.loggedUser.userName === user.userName) {
            this.userList.splice(turn, 1);
          }
          turn++;
        }
        this.userList[0].active = 'active';
        this.activeUser = this.userList[0];
        this.getAllMessagesForActiveUser();
      },
      err => {
        alert('An error has been occured');
      });
  }

  isActive(user) {
    for (const userChild of this.userList) {
         if (user === userChild) {
           userChild.active = 'active';
           this.activeUser = user;
         } else {
           userChild.active = '';
         }
    }
    this.getAllMessagesForActiveUser();
  }

  // sendMessageUsingSocket() {
  //     const message: Message = { message: this.messageText, fromId: this.loggedUser.id, toId: this.activeUser.id };
  //     this.stompClient.send('/socket-subscriber/send/message',
  //       {}, JSON.stringify(message));
  // }

  sendMessageUsingRest() {
    const from = this.loggedUser.id.toString();
    const to = this.activeUser.id.toString();
    const messageText = this.messageText;
    const timeText = this.datePipe.transform(new Date(), 'h:mm a').toString();
    const messages: Message = {
      message: messageText,
      fromId: from,
      toId: to,
      time: timeText
    };
    this.socketService.post(messages).subscribe(res => {
      this.messageText = '';
      console.log(res);
    });
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect(
      {},
      function(frame) {
      that.isLoaded = true;
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/socket-publisher', (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe('/socket-publisher/' + this.loggedUser.id.toString(),
        (message) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message) {
    if (message.body) {
      const messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
      // this.toastr.success('new message recieved', null, {
      //   timeOut: 3000
      // });
    }
  }

  getAllMessagesForActiveUser() {
    const messageIdentity: Message = new Message();
    messageIdentity.toId = this.activeUser.id;
    messageIdentity.fromId = this.loggedUser.id;
    this.socketService.getAllMessagesForUser(messageIdentity)
      .pipe(first())
      .subscribe(
        data => {
          this.messages = data['body'];
          this.totalMessage = this.messages.length;
        },
        err => {
          alert('An error has been occured');
        });
  }
}
