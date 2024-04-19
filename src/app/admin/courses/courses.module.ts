import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import {
  TcButtonModule,
  TcDirectivesModule, TcIconButtonModule,
  TcIndeterminateProgressModule,
  TcInputModule,
  TcPaginationModule, TcSelectListModule, TcStepsModule,
  TcTableModule, TcTextAreaModule
} from "toll-ui";
import { UploadCourseComponent } from './upload-course/upload-course.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CoursesComponent,
    UploadCourseComponent
  ],
    imports: [
        CommonModule,
        CoursesRoutingModule,
        TcIndeterminateProgressModule,
        TcButtonModule,
        TcInputModule,
        TcPaginationModule,
        TcTableModule,
        TcDirectivesModule,
        TcStepsModule,
        ReactiveFormsModule,
        TcTextAreaModule,
        TcSelectListModule,
        TcIconButtonModule,
        FormsModule,
        SharedModule
    ]
})
export class CoursesModule { }
