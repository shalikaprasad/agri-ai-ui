import { Component, OnInit } from '@angular/core';
import {Farmer} from 'projects/administration/src/app/shared/models/Farmer';
import {UserService} from 'projects/tools/src/lib/user.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {User} from 'projects/administration/src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  users: User[] = [];
  public popoverTitle = 'Delete Officer';
  public popoverMessage = 'Are You Sure Delete Officer?';
  public cancelClicked = false;

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data['body'];
    });
  }

  deleteUser(id, user) {
    this.userService.deleteUser(id).pipe(first())
      .subscribe(
        data => {
          const index = this.users.indexOf(user);
          this.users.splice(index, 1);
        });
  }

  updateFarmer(user: User) {
    localStorage.setItem('updateUser', JSON.stringify(user));
    this.router.navigate(['/dashboard/update-profile/' + user.id]);
  }
}
