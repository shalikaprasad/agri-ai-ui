import { Injectable } from '@angular/core';
import {ProjectService} from 'projects/tools/src/lib/project.service';
import {CropService} from 'projects/tools/src/lib/crop.service';
import {SQLQuery} from 'projects/administration/src/app/shared/models/SQLQuery';
import {PeriodicElement} from 'projects/administration/src/app/module/common/project-analysis/project-analysis.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private array = [];
  private crops = [];
  private chart = [];
  private pieChartProjectCountFarmer = [];
  private pieChartCountForCrop = [];
  private pieChartCountForProfit = [];
  private countForCrop = [];
  private countForProfit = [];
  private projectCountFarmer = [];
  private tableProjectCountFarmer = [];

  constructor(private projectService: ProjectService, private cropService: CropService) {
  }

  bigChart(data) {
    this.array = data;
    let i = 0;
    for (const projects of this.array) {
      this.chart[i] = {
        name: projects.name,
        data: projects.array
      };
      i++;
    }
    return this.chart;
  }
    // return [{
    //   name: this.array[0],
    //   data: [502, 635, 809, 947, 1402, 3634, 5268]
    // }, {
    //   name: this.array[1],
    //   data: [106, 107, 111, 133, 221, 767, 1766]
    // }, {
    //   name: this.array[3],
    //   data: [163, 203, 276, 408, 547, 729, 628]
    // }, {
    //   name: 'America',
    //   data: [18, 31, 54, 156, 339, 818, 1201]
    // }, {
    //   name: 'Oceania',
    //   data: [2, 2, 2, 6, 13, 30, 46]
    // }];


  cards() {
    return [71, 78, 39, 66];
  }

  pieChartFarmerProjects(data) {
      this.projectCountFarmer = data;
      let i = 0;
      for (const projects of this.projectCountFarmer) {
         if (projects.isBigger) {
           this.pieChartProjectCountFarmer[i] = {
             name: projects.name + 'V',
             y: projects.total,
             sliced: true,
             selected: true
           };
         } else {
           this.pieChartProjectCountFarmer[i] = {
             name: projects.name + 'V',
             y: projects.total
           };
         }
         i++;
        }
      return this.pieChartProjectCountFarmer;
    // return [{
    //   name: 'Chrome',
    //   y: 61.41,
    //   sliced: true,
    //   selected: true
    // }, {
    //   name: 'Internet Explorer',
    //   y: 11.84
    // }, {
    //   name: 'Firefox',
    //   y: 10.85
    // }, {
    //   name: 'Edge',
    //   y: 4.67
    // }, {
    //   name: 'Safari',
    //   y: 4.18
    // }, {
    //   name: 'Sogou Explorer',
    //   y: 1.64
    // }, {
    //   name: 'Opera',
    //   y: 1.6
    // }, {
    //   name: 'QQ',
    //   y: 1.2
    // }, {
    //   name: 'Other',
    //   y: 2.61
    // }];
  }

  pieChartCropCounts(data) {
      this.countForCrop = data;
      let i = 0;
      for (const projects of this.countForCrop) {
        if (projects.isBigger) {
          this.pieChartCountForCrop[i] = {
            name: projects.name,
            y: projects.total,
            sliced: true,
            selected: true
          };
        } else {
          this.pieChartCountForCrop[i] = {
            name: projects.name,
            y: projects.total
          };
        }
        i++;
      }
      return this.pieChartCountForCrop;
  }

  pieChartProfitCounts(data) {
      this.countForProfit = data;
      let i = 0;
      for (const projects of this.countForProfit) {
        if (projects.isBigger) {
          this.pieChartCountForProfit[i] = {
            name: projects.name,
            y: projects.number,
            sliced: true,
            selected: true
          };
        } else {
          this.pieChartCountForProfit[i] = {
            name: projects.name,
            y: projects.number
          };
        }
        i++;
      }
      return this.pieChartCountForProfit;
  }

  matTableFarmerProjects() {
    let i = 0;
    const tableDataList = [];
    for (const projects of this.projectCountFarmer) {
          const tableData: PeriodicElement = new PeriodicElement();
          tableData.orders = i + 1;
          tableData.name = projects.name + 'V';
          tableData.projects = projects.total;
          tableDataList[i] = tableData;
          i++;
    }
    return tableDataList;
  }
}

