import { Component, OnInit } from '@angular/core';
import {Crop} from 'projects/administration/src/app/shared/models/Crop';
import {CropService} from 'projects/tools/src/lib/crop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {ProjectService} from 'projects/tools/src/lib/project.service';
import {Project} from 'projects/administration/src/app/shared/models/Project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  public popoverTitle = 'Delete Project';
  public popoverMessage = 'Are You Sure Delete Project?';
  public cancelClicked = false;
  farmerId: string;

  constructor(
    private cropService: CropService,
    private projectService: ProjectService,
    private router: Router,
    private actRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.farmerId = this.actRoute.snapshot.params.id;
    localStorage.setItem('selectedFarmerIdForProject', JSON.stringify(this.farmerId));
    this.projectService.getProjectsForUser(this.farmerId).subscribe((data: Project[]) => {
      this.projects = data['body'];
    });
  }

  deleteProject(id, project) {
    this.projectService.deleteProject(id).pipe(first())
      .subscribe(
        data => {
          const index = this.projects.indexOf(project);
          this.projects.splice(index, 1);
        });
  }

  updateProject(project: Project) {
    localStorage.setItem('updateProject', JSON.stringify(project));
    this.router.navigate(['/dashboard/create-project/' + project.id]);
  }
}
