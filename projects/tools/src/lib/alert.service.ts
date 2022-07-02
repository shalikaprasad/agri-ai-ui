import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router, public snackBar: MatSnackBar) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     if (this.keepAfterRouteChange) {
    //       // only keep for a single route change
    //       this.keepAfterRouteChange = false;
    //     } else {
    //       // clear alert message
    //       this.clear();
    //     }
    //   }
    // });
  }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string) {
    this.config.panelClass = ['notification', 'success'];
    const snackBarRef = this.snackBar.open(message, '', this.config);
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('snackbar dismiss');
    });
    // this.subject.next({ type: 'success', text: message });
  }

  warn(message: string) {
    this.config.panelClass = ['notification', 'warn'];
    this.snackBar.open(message, '', this.config);
    // this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', text: message });
  }

  clear() {
    // clear by calling subject.next() without parameters
    this.subject.unsubscribe();
  }
}
