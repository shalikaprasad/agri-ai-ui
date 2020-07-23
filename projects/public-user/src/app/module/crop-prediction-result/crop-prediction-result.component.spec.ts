import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPredictionResultComponent } from './crop-prediction-result.component';

describe('CropPredictionResultComponent', () => {
  let component: CropPredictionResultComponent;
  let fixture: ComponentFixture<CropPredictionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropPredictionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropPredictionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
