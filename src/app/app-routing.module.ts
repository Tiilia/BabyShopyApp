import { Role } from './Models/role';
import { DashboardComponent } from './Components/admin/dashboard/dashboard.component';
import { HomeAdminComponent } from './Components/admin/home-admin/home-admin.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { NbAuthComponent, NbLoginComponent, NbLogoutComponent, NbRegisterComponent, NbRequestPasswordComponent, NbResetPasswordComponent } from '@nebular/auth';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", redirectTo: "" },
  { path: "shop", component: ProductsListComponent},
  { path: "product/:id", component: ProductsDetailsComponent},

  //{ path: "cart", canActivate: [AuthGuardService], component: },
  
  { 
    path: 'auth', component: NbAuthComponent,
    children: [
      { path: '', component: NbLoginComponent },
      { path: 'login', component: NbLoginComponent },
      { path: 'register', component: NbRegisterComponent },
      { path: 'logout', component: NbLogoutComponent },
      { path: 'request-password', component: NbRequestPasswordComponent },
      { path: 'reset-password', component: NbResetPasswordComponent },
    ], 
  },
  { 
    path: 'admin', component: HomeAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: [Role.admin] },
    children: [
      {path: 'reports', component: DashboardComponent}    
    ]
  },

  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
