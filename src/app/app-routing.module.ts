import { OrderValidateComponent } from './Components/order-validate/order-validate.component';
import { UserComponent } from './Components/user/user.component';
import { OrdersComponent } from './Components/admin/orders/orders.component';
import { AdminAuthGuardService } from './Services/admin-auth-guard.service';
import { ReportingComponent } from './Components/admin/reporting/reporting.component';
import { OrderComponent } from './Components/order/order.component';
import { CartComponent } from './Components/cart/cart.component';
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

  { path: "cart", canActivate: [AuthGuardService], component: CartComponent},
  { path: "order", canActivate: [AuthGuardService], component: OrderComponent},
  { path: "order/validate", canActivate: [AuthGuardService], component: OrderValidateComponent},
  { path: "user", canActivate: [AuthGuardService], component: UserComponent},
  
  {path: 'admin', 
    canActivate: [AdminAuthGuardService],
    children: [
    {path: 'report', component: ReportingComponent},
    {path: 'orders', component: OrdersComponent},
  ],
  },
  { 
    path: 'auth', component: NbAuthComponent,
    children: [
      { path: '', component: NbLoginComponent },
      { path: 'login', component: NbLoginComponent },
      { path: 'register', component: NbRegisterComponent },
      //{ path: 'logout', component: NbLogoutComponent },
      { path: 'request-password', component: NbRequestPasswordComponent },
      { path: 'reset-password', component: NbResetPasswordComponent },
    ], 
  },

  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
