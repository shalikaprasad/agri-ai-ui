import { Component, OnInit } from '@angular/core';
import {News} from 'projects/public-user/src/app/shared/models/News';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from 'projects/tools/src/lib/news.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {FileService} from 'projects/tools/src/lib/file.service';

@Component({
  selector: 'app-news-bar',
  templateUrl: './news-bar.component.html',
  styleUrls: ['./news-bar.component.scss']
})
export class NewsBarComponent implements OnInit {

  public newsList: News[];
  public baseImagePath: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private newsListService: NewsService,
              private sanitizer: DomSanitizer,
              private pathService: FileService) {
    this.baseImagePath = pathService.getImageBasePath() + 'news';
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.newsListService.getNewsList(5).subscribe((res) => {
        this.newsList = res['body'];
      },
      err => {
        alert('An error has been occured');
      });
  }

  sanitizeImg(url): SafeUrl {
    const img = 'project/images/';
    return this.sanitizer.bypassSecurityTrustUrl(img + url);
  }

}
