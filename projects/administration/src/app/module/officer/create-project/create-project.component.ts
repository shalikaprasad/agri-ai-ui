import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CropPredictionService} from 'projects/tools/src/lib/crop-prediction.service';
import {AlertService} from 'projects/tools/src/lib/alert.service';
import {first} from 'rxjs/operators';
import {Project} from 'projects/administration/src/app/shared/models/Project';
import {ProjectService} from 'projects/tools/src/lib/project.service';
import {Farmer} from 'projects/administration/src/app/shared/models/Farmer';
import {CropService} from 'projects/tools/src/lib/crop.service';
import {Crop} from 'projects/administration/src/app/shared/models/Crop';
import {DatePipe, Location} from '@angular/common';
import {OtherService} from 'projects/tools/src/lib/other.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  farmingTypeList: any = ['Select Farming Type', 'Pastoral', 'Arable', 'Subsistence', 'Commercial'];
  cropNameList: any = ['Select Crop Name'];
  cropStartDate: Date;
  districtList: any;
  createProjectForm: FormGroup;
  loading = false;
  submitted = false;
  project: Project = new Project();
  farmerId: any;
  projectId: string;
  villageList: any;
  soilStateList: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private alertService: AlertService,
    private actRoute: ActivatedRoute,
    private cropService: CropService,
    private location: Location,
    private datePipe: DatePipe,
    private otherService: OtherService
  ) {
    this.projectId = this.actRoute.snapshot.params.id;
    const updatedProject = JSON.parse(localStorage.getItem('updateProject'));
    if (updatedProject !== undefined && updatedProject !== null && updatedProject.id.toString() === this.projectId) {
      this.project = updatedProject;
    } else {
      this.project = new Project();
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.createProjectForm.controls[controlName].hasError(errorName);
  }

  // convenience getter for easy access to form fields
  get f() { return this.createProjectForm.controls; }

  ngOnInit() {
    this.districtList = this.otherService.getDistrictList();
    this.cropService.getAllCropNames().pipe(first()).subscribe((data: string[]) => {
      this.cropNameList = data['body'];
    });

    this.farmerId = JSON.parse(localStorage.getItem('selectedFarmerIdForProject'));
    let farmingType: any = 'Select Farming Type';
    let cropName: any = 'Select Crop Name';
    let district: any = 'Select District';
    this.soilStateList = this.otherService.getSolidTypeList();
    if (this.project.farmingType !== undefined) {
      farmingType = this.project.farmingType;
    }
    if (this.project.crop !== undefined) {
      cropName = this.project.crop.cropName;
    }
    if (this.project.district !== undefined) {
      district = this.project.district;
    }
    if (this.project.soilStatus !== undefined) {
      this.soilStateList = this.project.soilStatus;
    }
    this.createProjectForm = this.formBuilder.group({
      farmingType: [farmingType, [Validators.required]],
      cropName: [cropName, [Validators.required]],
      district: [district, [Validators.required]],
      village: [this.project.village, [Validators.required]],
      landSize: [this.project.landSize, []],
      pressure: [this.project.pressure, []],
      humidity: [this.project.humidity, []],
      rainfall: [this.project.rainfall, []],
      temperature: [this.project.temperature, []],
      soilStatus: [this.soilStateList, []],
      cropStartDate: [this.project.startDate, []],
      income: [this.project.income, []],
      expensive: [this.project.expensive, []],
      description: [this.project.description, []],
      reasonFail: [this.project.reasonFail, []],
      isFail: [false, []],
      isExpired: [false, []],
    });
  }

  onSubmitProject() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createProjectForm.invalid) {
      return;
    }
    const farmer = new Farmer();
    farmer.id = this.farmerId;
    this.loading = true;
    this.project.farmer = farmer;
    this.project.farmingType = this.f.farmingType.value;
    this.project.cropName = this.f.cropName.value;
    this.project.district = this.f.district.value;
    this.project.village = this.f.village.value;
    this.project.landSize = this.f.landSize.value;
    this.project.pressure = this.f.pressure.value;
    this.project.humidity = this.f.humidity.value;
    this.project.rainfall = this.f.rainfall.value;
    this.project.temperature = this.f.temperature.value;
    this.project.soilStatus = this.f.soilStatus.value;
    this.project.startDate = this.f.cropStartDate.value;
    this.project.income = this.f.income.value;
    this.project.expensive = this.f.expensive.value;
    this.project.description = this.f.description.value;
    this.project.reasonFail = this.f.reasonFail.value;
    this.project.isFail = this.f.isFail.value;
    this.project.isExpired = this.f.isExpired.value;

    if (this.project.isFail == null) {
      this.project.isFail = false;
    }
    if (this.project.isExpired == null) {
      this.project.isExpired = false;
    }

    this.projectService.createProject(this.project)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dashboard/project-list/' + this.farmerId]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getVillage(district) {
    this.villageList = this.otherService.getVillageList(district.target.value);
  }

  getSolidTypeList() {

  }
}
