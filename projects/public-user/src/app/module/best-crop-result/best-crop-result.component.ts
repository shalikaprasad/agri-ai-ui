import { Component, OnInit } from '@angular/core';
import {PredictedCrop} from 'projects/public-user/src/app/shared/models/PredictedCrop';
import {Router} from '@angular/router';
import {OtherService} from 'projects/tools/src/lib/other.service';

@Component({
  selector: 'app-best-crop-result',
  templateUrl: './best-crop-result.component.html',
  styleUrls: ['./best-crop-result.component.scss']
})
export class BestCropResultComponent implements OnInit {

  predictedCrop = new PredictedCrop();
  predictedCropList: PredictedCrop[];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.predictedCropList = JSON.parse(localStorage.getItem('predictedCrop'));
  }


  goBack() {
    this.router.navigate(['/home/best-crop']);
  }

  giveFeedback() {
    this.router.navigate(['/home/best-crop']);
  }

}
