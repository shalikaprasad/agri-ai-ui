import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from 'projects/public-user/src/app/shared/models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';
import {AlertService} from 'projects/tools/src/lib/alert.service';
import {first} from 'rxjs/operators';
import {UserService} from 'projects/tools/src/lib/user.service';
import {ProjectService} from 'projects/tools/src/lib/project.service';
import {DashboardService} from 'projects/tools/src/lib/dashboard.service';
import {SQLQuery} from 'projects/administration/src/app/shared/models/SQLQuery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  user: User = new User();
  bigChart = [];
  pieChartFarmerProjects = [];
  pieChartCropCounts = [];
  pieChartCropProfits = [];
  tableProjectCountFarmer = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService,
    private projectService: ProjectService,
    private dashboardService: DashboardService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['/dashboard/project-status']);
    }
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginFormUserName: ['', [Validators.required]],
      loginFormPassword: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.user.userName = this.f.loginFormUserName.value;
    this.user.password = this.f.loginFormPassword.value;

    this.authenticationService.login(this.user)
      .pipe(first())
      .subscribe(
        data => {
          window.sessionStorage.setItem('token', JSON.stringify(data));
          localStorage.setItem('currentUserName', this.user.userName);
          this.userService.getUser()
            .pipe(first())
            .subscribe(
              userData => {
                this.user = userData['body'];

                this.projectService.getProjectsForRequiredMonth().subscribe((data2: SQLQuery[]) => {
                  this.bigChart = this.dashboardService.bigChart(data2['body']);

                  this.projectService.getProjectCountByFarmerID().subscribe((data3: SQLQuery[]) => {
                    this.pieChartFarmerProjects = this.dashboardService.pieChartFarmerProjects(data3['body']);

                    this.projectService.getCropCounts().subscribe((data4: SQLQuery[]) => {
                      this.pieChartCropCounts = this.dashboardService.pieChartCropCounts(data4['body']);

                      this.projectService.getProfitCounts().subscribe((data5: SQLQuery[]) => {
                        this.pieChartCropProfits = this.dashboardService.pieChartProfitCounts(data5['body']);

                        this.tableProjectCountFarmer = this.dashboardService.matTableFarmerProjects();

                        localStorage.setItem('currentUser', JSON.stringify(this.user));
                        localStorage.setItem('bigChart', JSON.stringify(this.bigChart));
                        localStorage.setItem('pieChartFarmerProjects', JSON.stringify(this.pieChartFarmerProjects));
                        localStorage.setItem('pieChartCropCounts', JSON.stringify(this.pieChartCropCounts));
                        localStorage.setItem('pieChartCropProfits', JSON.stringify(this.pieChartCropProfits));
                        localStorage.setItem('tableProjectCountFarmer', JSON.stringify(this.tableProjectCountFarmer));
                        this.router.navigate(['/dashboard/home']);
                      });
                    });
                  });
                });
              });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
