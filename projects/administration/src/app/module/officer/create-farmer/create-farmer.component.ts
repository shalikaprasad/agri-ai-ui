import { Component, OnInit } from '@angular/core';
import {Farmer} from 'projects/administration/src/app/shared/models/Farmer';
import {UserService} from 'projects/tools/src/lib/user.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-farmer',
  templateUrl: './create-farmer.component.html',
  styleUrls: ['./create-farmer.component.scss']
})
export class CreateFarmerComponent implements OnInit {

  farmers: Farmer[] = [];
  public popoverTitle = 'Delete Farmer';
  public popoverMessage = 'Are You Sure Delete Farmer?';
  public cancelClicked = false;

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getAllFarmers().subscribe((data: Farmer[]) => {
      this.farmers = data['body'];
    });
  }

  deleteFarmer(id, farmer) {
    this.userService.deleteFarmer(id).pipe(first())
      .subscribe(
        data => {
          const index = this.farmers.indexOf(farmer);
          this.farmers.splice(index, 1);
        });
  }

  updateFarmer(farmer: Farmer) {
    localStorage.setItem('updateFarmer', JSON.stringify(farmer));
    this.router.navigate(['/dashboard/update-farmer/' + farmer.id]);
  }

  goProjects(farmer: Farmer) {
    localStorage.setItem('projectFarmerName', JSON.stringify(farmer.firstName + ' ' + farmer.lastName));
    this.router.navigate(['/dashboard/project-list/' + farmer.id]);
  }
}
