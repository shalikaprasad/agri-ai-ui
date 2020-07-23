import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPredictionComponent } from './crop-prediction.component';

describe('CropPredictionComponent', () => {
  let component: CropPredictionComponent;
  let fixture: ComponentFixture<CropPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
