import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { HeaderComponent } from './Components/header/header.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsListComponent,
    ProductsDetailsComponent,
    NotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbEvaIconsModule,
    NbLayoutModule,
    NbButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
