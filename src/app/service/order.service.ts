import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OrderService  {

  // Observable string sources
  private orderAnnouncedSource = new Subject<string>();
  private orderConfirmedSource = new Subject<string>();

  // Observable string streams
  orderAnnounced$ = this.orderAnnouncedSource.asObservable();
  orderConfirmed$ = this.orderConfirmedSource.asObservable();

  // Service message commands
  announceOrder(order: string) {
    this.orderAnnouncedSource.next(order);
  }
  confirmOrder(astronaut: string) {
    this.orderConfirmedSource.next(astronaut);
  }
}
