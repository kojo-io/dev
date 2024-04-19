import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {SharedModule} from "../shared/shared.module";
import { CheckoutComponent } from './checkout/checkout.component';
import {TcButtonModule, TcInputModule, TcRadioModule, TcRatingsModule, TcSelectListModule} from "toll-ui";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PagesComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    TcSelectListModule,
    FormsModule,
    TcRadioModule,
    TcRatingsModule,
    TcButtonModule,
    TcInputModule,
  ]
})
export class PagesModule { }
