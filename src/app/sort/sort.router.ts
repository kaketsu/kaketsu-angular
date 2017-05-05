import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortMethodComponent } from './sort.component';
import { QuickSortComponent } from './quicksort/quicksort.component';
import { BubbleSortComponent } from './bubblesort/bubblesort.component';

const SortRoutes: Routes = [
  {
    path: 'sort',
    component: SortMethodComponent,
    children: [
      {
        path: 'quicksort',
        component: QuickSortComponent
      },
      {
        path: 'bubblesort',
        component: BubbleSortComponent
      }
   ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(SortRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SortRoutingModule {}
