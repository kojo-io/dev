import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {TcButtonModule, TcDirectivesModule} from "toll-ui";
import { FooterComponent } from './footer/footer.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { VideoPlayerComponent } from './video-player/video-player.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    VideoPlayerComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule,
    TcButtonModule,
    TcDirectivesModule,
    RouterLinkActive,
    RouterLink
  ]
})
export class SharedModule { }
