import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SortMethodComponent } from './sort/sort.component';
import { QuickSortComponent } from './sort/quicksort/quicksort.component';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { Playground2Component } from './playground2/playground2.component';
import { Playground3Component } from './playground3/playground3.component';
import { DrageComponent } from './drage/drage.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/play2',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'play',
    component: PlaygroundComponent
  },
  {
    path: 'play2',
    component: Playground2Component
  },
  {
    path: 'play3',
    component: Playground3Component
  },
  {
    path: 'drage',
    component: DrageComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}