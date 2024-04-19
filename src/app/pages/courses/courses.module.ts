import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import {TcButtonModule, TcPaginationModule, TcRatingsModule} from "toll-ui";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    TcButtonModule,
    TcRatingsModule,
    FormsModule,
    TcPaginationModule
  ]
})
export class CoursesModule { }
