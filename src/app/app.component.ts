import { Component, OnInit } from '@angular/core';
import { NgProgressService } from 'ng2-progressbar';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';
  constructor (private progressService: NgProgressService) {
    this.progressService.start();
    setTimeout(() => {
      this.progressService.done();
    }, 1000);

  }
  ngOnInit() {
    const aclick = Observable.fromEvent(document.querySelector('#abutton'), 'click');
    const aresult = aclick.mergeMap(x =>
      Observable.interval(1000).take(5).map(i => i)
    ).subscribe(x => console.log(x));


    const bclick = Observable.fromEvent(document.querySelector('#bbutton'), 'click');
    const bresult = bclick.switchMap(x =>
      Observable.interval(1000).take(5).map(i => i)
    ).subscribe(x => console.log(x));
  }

}

