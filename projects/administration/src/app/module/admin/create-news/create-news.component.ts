import { Component, OnInit } from '@angular/core';
import {Farmer} from 'projects/administration/src/app/shared/models/Farmer';
import {UserService} from 'projects/tools/src/lib/user.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {NewsService} from 'projects/tools/src/lib/news.service';
import {News} from 'projects/administration/src/app/shared/models/News';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit {

  newsList: News[] = [];
  public popoverTitle = 'Delete News';
  public popoverMessage = 'Are You Sure Delete News?';
  public cancelClicked = false;

  constructor(
    public newsService: NewsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newsService.getNewsList(10).subscribe((data: News[]) => {
      this.newsList = data['body'];
    });
  }

  deleteFarmer(id, farmer) {
    this.newsService.deleteNews(id).pipe(first())
      .subscribe(
        data => {
          const index = this.newsList.indexOf(farmer);
          this.newsList.splice(index, 1);
        });
  }

  updateNews(news: News) {
    localStorage.setItem('updateNews', JSON.stringify(news));
    this.router.navigate(['/dashboard/update-news/' + news.id]);
  }
}
