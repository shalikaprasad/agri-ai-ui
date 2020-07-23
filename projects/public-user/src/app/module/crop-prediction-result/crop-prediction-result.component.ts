import { Component, OnInit } from '@angular/core';
import {PredictedPrice} from 'projects/public-user/src/app/shared/models/PredictedPrice';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crop-prediction-result',
  templateUrl: './crop-prediction-result.component.html',
  styleUrls: ['./crop-prediction-result.component.scss']
})
export class CropPredictionResultComponent implements OnInit {

  predictedPrice = new PredictedPrice();
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.predictedPrice = JSON.parse(localStorage.getItem('predictedPrice'));
  }


  goBack() {
    this.router.navigate(['/home/crop-prediction']);
  }

  giveFeedback() {
    this.router.navigate(['/home/crop-prediction']);
  }
}
