import { Component, OnInit } from '@angular/core';
import {FileService} from 'projects/tools/src/lib/file.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

currentUser: any;
imagePath: any;
lock = true;
constructor(
  private fileService: FileService
) {
}

ngOnInit(): void {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const baseImagePath = this.fileService.getImageBasePath();
  this.imagePath = baseImagePath + 'user/' + this.currentUser.imageFileName;
  if (this.currentUser.userName === 'admin') {
    this.lock = false;
  }
}



}
