import { AuthGuardService } from './Services/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbButtonModule, NbLayoutModule, NbSidebarModule, NbIconModule, NbMenuModule, NbCardModule, NbUserModule, NbBadgeModule, NbContextMenuModule, NbAlertModule, NbActionsModule, NbInputModule, NbSearchModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { HeaderComponent } from './Components/header/header.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { CartComponent } from './Components/cart/cart.component';


const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsListComponent,
    ProductsDetailsComponent,
    NotFoundComponent,
    SideBarComponent,
    CartComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbEvaIconsModule,
    NbIconModule,
    NbLayoutModule,
    NbButtonModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NbCardModule,
    NbUserModule,
    NbBadgeModule,
    NbContextMenuModule,
    NbAlertModule,
    NbActionsModule,
    NbInputModule,
    NbSearchModule,


    NbAuthModule.forRoot({
      strategies:[
        NbPasswordAuthStrategy.setup({
          name:'email',
          token: {
              class: NbAuthJWTToken,
              key: 'token',
            },

          baseEndpoint: 'http://localhost:3000',
          login: {
            endpoint: '/auth/sign-in',
            redirect: {
              success: '/', // home page path
              failure: "/not-found", 
            },
            
          },
          register: {
            endpoint: '/auth/sign-up',
          },
          logout: {
            endpoint: '/auth/sign-out',
          },
          requestPass: {
            endpoint: '/auth/request-pass',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
          },

        }),
      ],

      
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        }
      },
    }),
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
