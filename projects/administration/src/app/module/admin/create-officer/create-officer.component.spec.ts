import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOfficerComponent } from './create-officer.component';

describe('CreateOfficerComponent', () => {
  let component: CreateOfficerComponent;
  let fixture: ComponentFixture<CreateOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
