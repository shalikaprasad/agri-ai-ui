import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';
import {Router} from '@angular/router';
import {UserService} from 'projects/tools/src/lib/user.service';
import {FileService} from 'projects/tools/src/lib/file.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  public isLoggedUser = false;
  currentUser: any;
  imagePath: any;
  lock = true;

  constructor(
    private fileService: FileService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.authenticationService.isUserLoggedIn()) {
      this.isLoggedUser = true;
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const baseImagePath = this.fileService.getImageBasePath();
    this.imagePath = baseImagePath + 'user/' + this.currentUser.imageFileName;
    if (this.currentUser.userName === 'admin') {
      this.lock = false;
    }
  }

  logout() {
    this.authenticationService.logOut();
    localStorage.setItem('isOpenDashboard', String(false));
    localStorage.setItem('isOpenHome', String(false));
    this.router.navigate(['/login']);
  }

  goHome() {
    localStorage.setItem('isOpenHome', String(true));
    localStorage.setItem('isOpenDashboard', String(false));
    this.router.navigate(['/']);
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
