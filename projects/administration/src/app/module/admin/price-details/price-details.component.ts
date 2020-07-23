import { Component, OnInit } from '@angular/core';
import {UserService} from 'projects/tools/src/lib/user.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Crop} from 'projects/administration/src/app/shared/models/Crop';
import {CropService} from 'projects/tools/src/lib/crop.service';

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.scss']
})
export class PriceDetailsComponent implements OnInit {

  crops: Crop[] = [];
  public popoverTitle = 'Delete Crop';
  public popoverMessage = 'Are You Sure Delete Crop?';
  public cancelClicked = false;

  constructor(
    private cropService: CropService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.cropService.getAllCrops().subscribe((data: Crop[]) => {
      this.crops = data['body'];
    });
  }

  deleteFarmer(id, crop) {
    this.cropService.deleteCrop(id).pipe(first())
      .subscribe(
        data => {
          const index = this.crops.indexOf(crop);
          this.crops.splice(index, 1);
        });
  }

  updateCrop(crop: Crop) {
    localStorage.setItem('updateCrop', JSON.stringify(crop));
    this.router.navigate(['/dashboard/update-price/' + crop.id]);
  }
}
