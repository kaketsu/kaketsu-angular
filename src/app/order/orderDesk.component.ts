import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'order-desk',
  templateUrl: './orderDesk.component.html',
  styleUrls: ['./orderDesk.component.css']
})
export class OrderDeskComponent {
  private newOrder = '';
  constructor(private orderService: OrderService) {

  }
  generateOrder() {
    this.orderService.announceOrder(this.newOrder);
  }
}