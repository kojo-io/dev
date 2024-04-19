import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './learning.component';
import {TcButtonModule, TcRatingsModule} from "toll-ui";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LearningComponent
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
    TcRatingsModule,
    FormsModule,
    TcButtonModule
  ]
})
export class LearningModule { }
