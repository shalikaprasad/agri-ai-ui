import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from 'projects/tools/src/lib/alert.service';
import {Crop} from 'projects/public-user/src/app/shared/models/Crop';
import {first} from 'rxjs/operators';
import {CropPredictionService} from 'projects/tools/src/lib/crop-prediction.service';
import {OtherService} from 'projects/tools/src/lib/other.service';

@Component({
  selector: 'app-crop-prediction',
  templateUrl: './crop-prediction.component.html',
  styleUrls: ['./crop-prediction.component.scss']
})
export class CropPredictionComponent implements OnInit {
  cropStartDate: any;
  districtList: any;
  villageList: any;
  fruitsList: any;
  cropTypeList: any;

  cropPredictionForm: FormGroup;
  loading = false;
  submitted = false;
  crop: Crop = new Crop();
  weather: any;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cropPredictionService: CropPredictionService,
    private alertService: AlertService,
    private otherService: OtherService
  ) { }

  public handleError = (controlName: string, errorName: string) => {
    return this.cropPredictionForm.controls[controlName].hasError(errorName);
  }

  // convenience getter for easy access to form fields
  get f() { return this.cropPredictionForm.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.cropPredictionForm.invalid) {
      return;
    }

    this.loading = true;

    this.crop.cropName = this.f.cropName.value;
    this.crop.cropSpecially = this.f.cropSpecially.value;
    this.crop.district = this.f.districtName.value;
    this.crop.village = this.f.villageName.value;
    this.crop.cropStartDate = this.f.cropStartDate.value;
    this.crop.extent = this.f.cropLandSize.value * 0.002529285264;

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

          this.cropPredictionService.getCropPredictionResult(this.crop)
            .pipe(first())
            .subscribe(
              data2 => {
                localStorage.setItem('predictedPrice', JSON.stringify(data2['body']));
                this.router.navigate(['/home/crop-prediction-result']);
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
      this.cropTypeList = this.otherService.getCropTypeList();
      this.districtList = this.otherService.getDistrictList();
      this.cropPredictionForm = this.formBuilder.group({
      cropName: ['', [Validators.required]],
      cropSpecially: ['', [Validators.required]],
      districtName: ['', [Validators.required]],
      villageName: ['', [Validators.required]],
      cropStartDate: ['', [Validators.required]],
      cropLandSize: ['', [Validators.required]]
    });
  }



  getVillage(district) {
    this.villageList = this.otherService.getVillageList(district.target.value);
  }

  getCropsList(type) {
    this.fruitsList = this.otherService.getCropsList(type.target.value);
  }
}
