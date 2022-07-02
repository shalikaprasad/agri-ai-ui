import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Project} from 'projects/administration/src/app/shared/models/Project';
import {Farmer} from 'projects/administration/src/app/shared/models/Farmer';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from 'projects/tools/src/lib/project.service';
import {AlertService} from 'projects/tools/src/lib/alert.service';
import {UserService} from 'projects/tools/src/lib/user.service';
import {first} from 'rxjs/operators';
import {DialogBoxComponent} from 'projects/administration/src/app/shared/widgets/dialog-box/dialog-box.component';
import {OtherService} from 'projects/tools/src/lib/other.service';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-update-farmer',
  templateUrl: './update-farmer.component.html',
  styleUrls: ['./update-farmer.component.scss']
})
export class UpdateFarmerComponent implements OnInit {

  farmerId: any;
  createFarmerForm: FormGroup;
  loading = false;
  submitted = false;
  farmer: Farmer = new Farmer();
  private isAgree: boolean;
  districtList: any;
  villageList: any;

  openSaveDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are You want to create Farmer?',
        name: this.farmer.firstName,
        body: 'Please check again if you not sure.',
        isNotCheck: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.saveFarmer();
      }
      console.log('The dialog was closed');
    });
  }

  openCheckDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Invalid Variable',
        name: this.farmer.firstName,
        body: 'Please insert/check again',
        isNotCheck: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.alertService.warn('Please insert');
      console.log('The dialog was closed');
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog,
    private otherService: OtherService
  ) {
    this.farmerId = this.actRoute.snapshot.params.id;
    const updatedFarmer = JSON.parse(localStorage.getItem('updateFarmer'));
    if (updatedFarmer !== undefined && updatedFarmer !== null && updatedFarmer.id.toString() === this.farmerId) {
      this.farmer = updatedFarmer;
    } else {
      this.farmer = new Farmer();
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.createFarmerForm.controls[controlName].hasError(errorName);
  }

  // convenience getter for easy access to form fields
  get f() { return this.createFarmerForm.controls; }

  ngOnInit() {
    this.districtList = this.otherService.getDistrictList();
    let district: any;
    if (this.farmer.district !== undefined) {
      district = this.farmer.district;
    } else {
      district = 'Select District';
    }
    this.createFarmerForm = this.formBuilder.group({
      idNumber: [this.farmer.idNumber, [Validators.required]],
      firstName: [this.farmer.firstName, [Validators.required]],
      lastName: [this.farmer.lastName, []],
      phoneNumber: [this.farmer.phoneNumber, []],
      district: [district, [Validators.required]],
      village: [this.farmer.village, [Validators.required]],
      isAgree: ['', []],
    });
  }

  onSubmitFarmer() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createFarmerForm.invalid) {
      this.openCheckDialog();
      return;
    } else {
      this.openSaveDialog();
    }
  }

  saveFarmer() {
    this.loading = true;
    this.farmer.idNumber = this.f.idNumber.value;
    this.farmer.firstName = this.f.firstName.value;
    this.farmer.lastName = this.f.lastName.value;
    this.farmer.phoneNumber = this.f.phoneNumber.value;
    this.farmer.district = this.f.district.value;
    this.farmer.village = this.f.village.value;
    this.isAgree = this.f.isAgree.value;

    this.userService.updateFarmer(this.farmer)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Successfully saved Messages');
          this.router.navigate(['/dashboard/create-farmer']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  getVillage(district) {
    this.villageList = this.otherService.getVillageList(district.target.value);
  }
}
