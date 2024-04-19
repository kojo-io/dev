import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import { LoginComponent } from './login/login.component';
import {
  ModalService,
  TcAlertModule,
  TcButtonModule,
  TcIndeterminateProgressModule,
  TcInputModule,
  TcRatingsModule
} from "toll-ui";
import { RegisterComponent } from './register/register.component';
import {RouterModule} from "@angular/router";
import { CourseComponent } from './course/course.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CartComponent } from './pages/cart/cart.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptService} from "./shared/error-intercept.service";
import {HttpinterceptorService} from "./shared/httpinterceptor.service";
import {ConfirmCheckoutComponent} from "./confirm-checkout/confirm-checkout.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CourseComponent,
    CartComponent,
    ConfirmCheckoutComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    TcInputModule,
    TcButtonModule,
    RouterModule,
    TcIndeterminateProgressModule,
    TcRatingsModule,
    FormsModule,
    ReactiveFormsModule,
    TcAlertModule,

  ],
  providers: [
    ModalService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
