import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {TcButtonModule, TcDirectivesModule, TcIndeterminateProgressModule, TcRatingsModule} from "toll-ui";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TcIndeterminateProgressModule,
    TcDirectivesModule,
    TcButtonModule,
    TcRatingsModule,
    FormsModule
  ]
})
export class HomeModule { }
