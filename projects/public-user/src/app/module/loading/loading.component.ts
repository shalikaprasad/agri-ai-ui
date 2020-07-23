import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(router: Router) {
    setTimeout(() => {
        router.navigate(['/home']).then(r => console.log('open home page'));
      },
      5000);
  }

  ngOnInit() {
  }

}
