import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';
import { RandomNumService } from '../service/random.service';
@Component({
  selector: 'take-desk',
  templateUrl: './takeDesk.component.html',
  styleUrls: ['./takeDesk.component.css']
})
export class TakeDeskComponent {
  private orderAll: string[] = [];

  constructor(private orderService: OrderService, private randomService: RandomNumService) {
    // order subscribe
    orderService.orderAnnounced$.subscribe((order) => {
        setTimeout(() => {
          console.log('Take Order:' + order);
          this.orderAll.push(order);
        }, 1000);
        // this.history.push(`${astronaut} confirmed the mission`);
    });
  }

  generateOrderNum() {
    return this.randomService.randomNum();
  }

  confirmOrder() {
    this.orderService.confirmOrder('gggg');
  }
}
