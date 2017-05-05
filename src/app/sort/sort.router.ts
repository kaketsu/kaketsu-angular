import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortMethodComponent } from './sort.component';
import { QuickSortComponent } from './quicksort/quicksort.component';

const SortRoutes: Routes = [
  {
    path: 'sort',
    component: SortMethodComponent,
    children: [
      {
        path: 'quicksort',
        component: QuickSortComponent
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
