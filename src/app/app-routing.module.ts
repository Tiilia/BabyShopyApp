import { ProductsListComponent } from './Components/products-list/products-list.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", redirectTo: "" },



  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
