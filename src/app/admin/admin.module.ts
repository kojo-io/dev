import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {TcDirectivesModule, TcIndeterminateProgressModule} from "toll-ui";


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TcIndeterminateProgressModule,
    TcDirectivesModule
  ]
})
export class AdminModule { }
