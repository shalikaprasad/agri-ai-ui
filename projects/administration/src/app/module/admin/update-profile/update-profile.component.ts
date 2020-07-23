import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Farmer} from 'projects/administration/src/app/shared/models/Farmer';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'projects/tools/src/lib/user.service';
import {AlertService} from 'projects/tools/src/lib/alert.service';
import {first} from 'rxjs/operators';
import {User} from 'projects/administration/src/app/shared/models/User';
import {FileService} from 'projects/tools/src/lib/file.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  userId: any;
  createUserForm: FormGroup;
  loading = false;
  submitted = false;
  user: User = new User();
  private isAgree: boolean;
  roleTypeList: any = ['Select Role Type', 'Administrator', 'Officer', 'User'];
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  base64Data: any;
  public baseImagePath: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private actRoute: ActivatedRoute,
    private fileService: FileService
  ) {
    this.baseImagePath = fileService.getImageBasePath() + 'user';
    this.userId = this.actRoute.snapshot.params.id;
    if (this.userId !== undefined) {
      const updatedUser = JSON.parse(localStorage.getItem('updateUser'));
      if (updatedUser.id.toString() === this.userId) {
        this.user = updatedUser;
        this.previewUrl = this.baseImagePath + '/' + this.user.imageFileName;
      } else {
        this.user = new User();
      }
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.createUserForm.controls[controlName].hasError(errorName);
  }

  // convenience getter for easy access to form fields

  get f() { return this.createUserForm.controls; }

  ngOnInit() {
    let roles: any;
    if (this.user.roles !== undefined) {
      roles = this.user.roles[0]['name'];
      this.user.password = null;
    } else {
      roles = 'Select Role Type';
    }

    this.createUserForm = this.formBuilder.group({
      branchId: [this.user.branchId, [Validators.required]],
      branchName: [this.user.branchName, [Validators.required]],
      address: [this.user.address, []],
      phoneNumber: [this.user.phoneNumber, []],
      userName: [this.user.userName, [Validators.required]],
      password: [this.user.password, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      roles: [roles, []],
      fileData: [''],
      isAgree: ['', []],
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  onSubmitUser() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createUserForm.invalid) {
      return;
    }

    this.loading = true;

    this.user.branchId = this.f.branchId.value;
    this.user.branchName = this.f.branchName.value;
    this.user.address = this.f.address.value;
    this.user.phoneNumber = this.f.phoneNumber.value;
    this.user.userName = this.f.userName.value;
    this.user.password = this.f.password.value;
    this.user.email = this.f.email.value;
    this.user.roles = this.f.roles.value;
    this.user.fileData = this.fileData;
    this.isAgree = this.f.isAgree.value;


    this.fileService.uploadImage(this.user.fileData, 'user')
      .pipe(first())
      .subscribe(
        data => {
          const bodyData1 = data['body']['0'];
          const bodyData2 = data['body']['1'];
          this.user.pictureId = bodyData1.id;
          this.user.imageName = bodyData1.imageName;
          this.user.imageFileName = bodyData1.imageFileName;
          this.user.thumbnail = bodyData2.thumbnail;
          this.user.imageFile = bodyData2.imageFile;
          this.userService.updateUser(this.user)
            .pipe(first())
            .subscribe(
              data => {
                this.router.navigate(['/dashboard/profile']);
              },
              error => {
                this.alertService.error(error);
                this.loading = false;
              });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
