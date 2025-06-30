import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyLibraryComponent } from './my-library/my-library.component';

// LibraryRoutingModule defines the routes for the library feature module.
// It includes the MyLibraryComponent as the main component for the library feature.
const routes: Routes = [
  {
    path: '',
    component: MyLibraryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
