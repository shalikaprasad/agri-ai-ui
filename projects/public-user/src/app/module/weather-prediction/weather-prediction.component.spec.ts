import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPredictionComponent } from './weather-prediction.component';

describe('WeatherPredictionComponent', () => {
  let component: WeatherPredictionComponent;
  let fixture: ComponentFixture<WeatherPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
