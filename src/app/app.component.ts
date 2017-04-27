import { Component } from '@angular/core';
import { NgProgressService } from 'ng2-progressbar';

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
}

