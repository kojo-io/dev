import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LearningComponent} from "./learning.component";

const routes: Routes = [
  {
    path: 'learning',
    component: LearningComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
