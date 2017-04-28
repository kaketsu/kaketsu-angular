import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ng2-progressbar';
import { AppComponent } from './app.component';
import { OrderDeskComponent } from './order/orderDesk.component';
import { TakeDeskComponent } from './take/takeDesk.component';
import { OrderService } from './service/order.service';
@NgModule({
  declarations: [
    AppComponent,
    OrderDeskComponent,
    TakeDeskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgProgressModule
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
