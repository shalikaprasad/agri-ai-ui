import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from 'projects/tools/src/lib/dashboard.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ProjectService} from 'projects/tools/src/lib/project.service';

export class PeriodicElement {
  orders: number;
  name: string;
  projects: number;
}
const ELEMENT_DATA: [] = JSON.parse(localStorage.getItem('tableProjectCountFarmer'));


@Component({
  selector: 'app-project-analysis',
  templateUrl: './project-analysis.component.html',
  styleUrls: ['./project-analysis.component.scss']
})
export class ProjectAnalysisComponent implements OnInit {

  constructor(
  ) {}

  bigChart = [];
  pieChartFarmerProjects = [];
  pieChartCropCounts = [];
  pieChartCropProfits = [];
  nameDataForFarmerProjects = [];
  nameDataForCropCounts = [];
  nameDataForCropProfits = [];

  displayedColumns: string[] = ['orders', 'name', 'projects'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.nameDataForFarmerProjects = ['Farmer Project Data', 'Projects'];
    this.nameDataForCropCounts = ['Crop Counts Data', 'Projects'];
    this.nameDataForCropProfits = ['Crop Profit Data', 'Profit'];
    this.bigChart = JSON.parse(localStorage.getItem('bigChart'));
    this.pieChartFarmerProjects = JSON.parse(localStorage.getItem('pieChartFarmerProjects'));
    this.pieChartCropCounts = JSON.parse(localStorage.getItem('pieChartCropCounts'));
    this.pieChartCropProfits = JSON.parse(localStorage.getItem('pieChartCropProfits'));
    this.dataSource.paginator = this.paginator;
  }

  // getBigChart() {
  //   const size = Object.keys(this.array).length;
  //   this.cropService.getAllCropNames().subscribe((data: any[]) => {
  //     this.crops = data['body'];
  //     let i = 0;
  //     for (const crop of this.crops) {
  //       this.bigChart[i] = {
  //         name: crop,
  //         data: this.array[crop]
  //       };
  //       i++;
  //     }
  //     console.log(this.bigChart);
  //     this.pieChart = this.dashboardService.pieChart();
  //
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

}
