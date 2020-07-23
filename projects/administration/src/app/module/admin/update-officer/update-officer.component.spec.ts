import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOfficerComponent } from './update-officer.component';

describe('UpdateOfficerComponent', () => {
  let component: UpdateOfficerComponent;
  let fixture: ComponentFixture<UpdateOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
