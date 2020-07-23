import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestCropResultComponent } from './best-crop-result.component';

describe('BestCropResultComponent', () => {
  let component: BestCropResultComponent;
  let fixture: ComponentFixture<BestCropResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestCropResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestCropResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
