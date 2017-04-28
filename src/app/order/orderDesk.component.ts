import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';
import { NgProgressService } from 'ng2-progressbar';
import { RandomNumService } from '../service/random.service';

@Component({
  selector: 'order-desk',
  templateUrl: './orderDesk.component.html',
  styleUrls: ['./orderDesk.component.css']
})

export class OrderDeskComponent {
  private newOrder = '';
  private orderHistory = [];
  constructor(private orderService: OrderService, private progressService: NgProgressService,
              private randomService: RandomNumService) {
    // confirm
    orderService.orderConfirmed$.subscribe((data) => {
      console.log(data);

      // this.progressService.done();
    });
  }
  generateOrder() {
    if (this.newOrder) {
      this.orderService.announceOrder(this.newOrder);
      this.orderHistory.push(this.newOrder);
      this.newOrder = '';
      // progress
      this.progressService.start();
      setTimeout(() => {
        this.progressService.done();
      }, 1000);
    }
  }
}
