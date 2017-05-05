import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ng2-progressbar';
import { SortRoutingModule } from './sort.router';

import { SortMethodComponent } from './sort.component';
import { QuickSortComponent } from './quicksort/quicksort.component';
@NgModule({
  declarations: [
    SortMethodComponent,
    QuickSortComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    SortRoutingModule
  ],
  providers: [],
})
export class SortModule { }