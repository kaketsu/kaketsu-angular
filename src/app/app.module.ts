import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ng2-progressbar';
import { AppComponent } from './app.component';
import { OrderDeskComponent } from './order/orderDesk.component';
import { TakeDeskComponent } from './take/takeDesk.component';

import { HomeComponent } from './home/home.component';
import { OrderService } from './service/order.service';
import { RandomNumService } from './service/random.service';
import { AppRoutingModule } from './app.router';

import { SortRoutingModule } from './sort/sort.router'
import { SortMethodComponent } from './sort/sort.component';
import { QuickSortComponent } from './sort/quicksort/quicksort.component';
import { BubbleSortComponent } from './sort/bubblesort/bubblesort.component';
@NgModule({
  declarations: [
    AppComponent,
    OrderDeskComponent,
    TakeDeskComponent,
    SortMethodComponent,
    HomeComponent,
    QuickSortComponent,
    BubbleSortComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    AppRoutingModule,
    SortRoutingModule
  ],
  providers: [OrderService, RandomNumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
