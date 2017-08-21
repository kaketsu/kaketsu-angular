import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SortMethodComponent } from './sort/sort.component';
import { QuickSortComponent } from './sort/quicksort/quicksort.component';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'play',
    component: PlaygroundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}