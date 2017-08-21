import { Component, OnInit } from '@angular/core';
import { NgProgressService } from 'ng2-progressbar';
import { Observable } from 'rxjs/Observable';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';
  constructor (private progressService: NgProgressService, private router: Router,) {
    this.router.events.subscribe(event => this.toggleProgress(event));
    this.progressService.start();
    setTimeout(() => {
      this.progressService.done();
    }, 500);

  }
  ngOnInit() {
    /*
    const aclick = Observable.fromEvent(document.querySelector('#abutton'), 'click');
    const aresult = aclick.mergeMap(x =>
      Observable.interval(1000).map(i => i)
    ).subscribe(x => console.log(x));

    const bclick = Observable.fromEvent(document.querySelector('#bbutton'), 'click');
    const bresult = bclick.switchMap(x =>
      Observable.interval(1000).take(5).map(i => i)
    ).subscribe(x => console.log(x));
    */
  }
  toggleProgress(event) {
    if (event instanceof NavigationStart) {
      this.progressService.start();
      return;
    }
    if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {
      this.progressService.done();
    }
  }
}

