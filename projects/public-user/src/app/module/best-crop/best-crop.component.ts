import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Crop} from 'projects/public-user/src/app/shared/models/Crop';
import {ActivatedRoute, Router} from '@angular/router';
import {CropPredictionService} from 'projects/tools/src/lib/crop-prediction.service';
import {AlertService} from 'projects/tools/src/lib/alert.service';
import {first} from 'rxjs/operators';
import {OtherService} from 'projects/tools/src/lib/other.service';
import {PredictedCrop} from 'projects/public-user/src/app/shared/models/PredictedCrop';

@Component({
  selector: 'app-best-crop',
  templateUrl: './best-crop.component.html',
  styleUrls: ['./best-crop.component.scss']
})
export class BestCropComponent implements OnInit {

  cropStartDate: any;
  districtList: any;
  villageList: any;

  bestCropForm: FormGroup;
  loading = false;
  submitted = false;
  crop: Crop = new Crop();
  weather: any;
  predictedCropList: PredictedCrop[];

  constructor(
    private otherService: OtherService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cropPredictionService: CropPredictionService,
    private alertService: AlertService
  ) { }

  // convenience getter for easy access to form fields
  get f() { return this.bestCropForm.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.bestCropForm.invalid) {
      return;
    }

    this.loading = true;
    this.crop.district = this.f.districtName.value;
    this.crop.village = this.f.villageName.value;
    this.crop.cropStartDate = this.f.cropStartDate.value;
    this.crop.year = Number(this.crop.cropStartDate.split('-')[0]);
    this.crop.month = Number(this.crop.cropStartDate.split('-')[1]);

    this.otherService.getWeather(this.crop.village).pipe(first())
      .subscribe(
        data => {
          this.weather = data;
          this.crop.tempMax = this.weather.main.temp_max;
          this.crop.tempMin = this.weather.main.temp_min;
          this.crop.temp = this.weather.main.temp;
          this.crop.pressure = this.weather.main.pressure;
          this.crop.humidity = this.weather.main.humidity;
          this.crop.windSpeed = this.weather.wind.speed;
          this.crop.precipitation = this.weather.visibility;
          this.crop.cloudCover = this.weather.clouds.all;

          this.cropPredictionService.getBestCropResult(this.crop)
            .pipe(first())
            .subscribe(
              data2 => {
                this.predictedCropList = data2['body'];
                this.setCropType();
                localStorage.setItem('predictedCrop', JSON.stringify(this.predictedCropList));
                this.router.navigate(['/home/best-crop-result']);
              },
              error => {
                this.alertService.error(error);
                this.loading = false;
              });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  ngOnInit() {
    this.districtList = this.otherService.getDistrictList();
    this.bestCropForm = this.formBuilder.group({
      districtName: ['', [Validators.required]],
      villageName: ['', [Validators.required]],
      cropStartDate: ['', [Validators.required]]
    });
  }

  getVillage(district) {
    this.villageList = this.otherService.getVillageList(district.target.value);
  }

  setCropType() {
    for (let i = 0; i < this.predictedCropList.length; i++) {
      this.predictedCropList[i].cropType = this.otherService.getCropType(this.predictedCropList[i].cropName);
    }
  }
}
