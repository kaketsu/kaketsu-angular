import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class RandomNumService {
  randomNum() {
    return Math.ceil((10000 * Math.random()));
  }
}
