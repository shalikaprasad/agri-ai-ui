import { Component, OnInit } from '@angular/core';
import {OtherService} from 'projects/tools/src/lib/other.service';
import {Weather} from 'projects/public-user/src/app/shared/models/Weather';
import {first} from 'rxjs/operators';
import {AlertService} from 'projects/tools/src/lib/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-weather-prediction',
  templateUrl: './weather-prediction.component.html',
  styleUrls: ['./weather-prediction.component.scss']
})
export class WeatherPredictionComponent implements OnInit {

  private weather: any;
  weatherPredictionForm: FormGroup;
  public weatherObj = new Weather();
  villageList: any;
  districtList: any;

  constructor(
    private formBuilder: FormBuilder,
    private otherService: OtherService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.districtList = this.otherService.getDistrictList();
    this.weatherPredictionForm = this.formBuilder.group({
      villageName: ['', [Validators.required]],
      districtName: ['', [Validators.required]]
    });
    this.addWeather('colombo');
  }

  onSubmit() {
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.weatherPredictionForm.invalid) {
      return;
    }
    const village  = this.f.villageName.value;
    if (village !== 'Village') {
      this.addWeather(village);
    }
  }

  get f() { return this.weatherPredictionForm.controls; }

  addWeather(city) {
    this.otherService.getWeather(city).pipe(first())
      .subscribe(
        data => {
          this.weather = data;
          this.weatherObj.city = this.weather.name;
          this.weatherObj.tempMax = this.weather.main.temp_max;
          this.weatherObj.tempMin = this.weather.main.temp_min;
          this.weatherObj.temp = this.weather.main.temp;
          this.weatherObj.pressure = this.weather.main.pressure;
          this.weatherObj.humidity = this.weather.main.humidity;
          this.weatherObj.windSpeed = this.weather.wind.speed;
          this.weatherObj.precipitation = this.weather.visibility;
          this.weatherObj.cloudCover = this.weather.clouds.all;
          this.weatherObj.heatIndex = this.getHeatIndex(this.weatherObj.temp, this.weatherObj.humidity );
        },
        error => {
          this.alertService.error(error);
        });
  }

  getHeatIndex(temp, hum) {
    return (-42.379 + 2.04901523 * temp + 10.14333127 * hum - .22475541 * temp * hum - .00683783 * temp * temp) -
      (.05481717 * hum * hum + .00122874 * temp * temp * hum + .00085282 * temp * hum * hum) -
      (.00000199 * temp * temp * hum * hum);
  }

  getVillage(districtName) {
    this.villageList = this.otherService.getVillageList(districtName.target.value);
  }
}
