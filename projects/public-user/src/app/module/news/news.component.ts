import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';
import {first} from 'rxjs/operators';
import {NewsService} from 'projects/tools/src/lib/news.service';
import {ActivatedRoute, Router} from '@angular/router';
import {News} from 'projects/public-user/src/app/shared/models/News';
import {FileService} from 'projects/tools/src/lib/file.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public newsList: News[];
  public baseImagePath: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private newsListService: NewsService,
              private pathService: FileService
  ) {
    this.baseImagePath = pathService.getImageBasePath() + 'news';
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.newsListService.getNewsList(5).subscribe((res) => {
      this.newsList = res['body'];
    });
  }


}
