import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from 'projects/tools/src/lib/alert.service';
import {first} from 'rxjs/operators';
import {Crop} from 'projects/administration/src/app/shared/models/Crop';
import {CropService} from 'projects/tools/src/lib/crop.service';
import {OtherService} from 'projects/tools/src/lib/other.service';

@Component({
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.scss']
})
export class UpdatePriceComponent implements OnInit {

  cropId: any;
  createCropPriceForm: FormGroup;
  loading = false;
  submitted = false;
  crop: Crop = new Crop();
  private isAgree: boolean;
  cropTypeList: any;
  lock = true;
  currentUser: any;
  districtList: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private actRoute: ActivatedRoute,
    private cropService: CropService,
    private otherService: OtherService
  ) {
    this.cropId = this.actRoute.snapshot.params.id;
    const updatedCrop = JSON.parse(localStorage.getItem('updateCrop'));
    if (updatedCrop !== undefined && updatedCrop !== null && updatedCrop.id.toString() === this.cropId) {
      this.crop = updatedCrop;
    } else {
      this.crop = new Crop();
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.createCropPriceForm.controls[controlName].hasError(errorName);
  }

  // convenience getter for easy access to form fields
  get f() { return this.createCropPriceForm.controls; }

  ngOnInit() {
    this.cropTypeList = this.otherService.getCropTypeList();
    this.districtList = this.otherService.getDistrictList();
    let cropType: any = 'Select News Crop Type';
    let district: any = 'Select District';
    if (this.crop.cropType !== undefined) {
      cropType = this.crop.cropType;
    }
    if (this.crop.district !== undefined) {
      district = this.crop.district;
    }
    this.createCropPriceForm = this.formBuilder.group({
      cropName: [this.crop.cropName, [Validators.required]],
      cropType: [cropType, [Validators.required]],
      district: [district, []],
      cropPrice: [this.crop.cropPrice, []],
      isAgree: ['', []],
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.userName === 'admin') {
      this.lock = false;
    }
  }

  onSubmitCrop() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createCropPriceForm.invalid) {
      return;
    }

    this.loading = true;

    this.crop.cropName = this.f.cropName.value;
    this.crop.cropType = this.f.cropType.value;
    this.crop.district = this.f.district.value;
    this.crop.cropPrice = this.f.cropPrice.value;
    this.isAgree = this.f.isAgree.value;

    this.cropService.updateCrop(this.crop)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dashboard/price-details']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
