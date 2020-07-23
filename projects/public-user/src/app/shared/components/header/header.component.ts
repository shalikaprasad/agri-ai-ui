import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

}
