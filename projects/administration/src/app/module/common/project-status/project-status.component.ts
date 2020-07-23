import { Component, OnInit } from '@angular/core';
import {Crop} from 'projects/administration/src/app/shared/models/Crop';
import {UserService} from 'projects/tools/src/lib/user.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Project} from 'projects/administration/src/app/shared/models/Project';
import {ProjectService} from 'projects/tools/src/lib/project.service';
import {CropService} from 'projects/tools/src/lib/crop.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit {

  projects: Project[] = [];
  public popoverTitle = 'Delete Project';
  public popoverMessage = 'Are You Sure Delete Project?';
  public cancelClicked = false;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.projectService.getAllProjects().pipe(first()).subscribe((data: any[]) => {
      this.projects = data['body'];
    });
  }

  deleteProject(project, id) {
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
