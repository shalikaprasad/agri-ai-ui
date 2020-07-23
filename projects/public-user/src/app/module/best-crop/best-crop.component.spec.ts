import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestCropComponent } from './best-crop.component';

describe('BestCropComponent', () => {
  let component: BestCropComponent;
  let fixture: ComponentFixture<BestCropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestCropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
