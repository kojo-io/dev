import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import videojs from 'video.js';
@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent implements OnInit, OnChanges, OnDestroy{

  @Input() data: any;
  @Input() endTime: any;
  @Output() currentTime = new EventEmitter();
  video: any;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      const ele = document.getElementById('video') as HTMLVideoElement;
      ele.addEventListener('contextmenu',(e) => {
        e.preventDefault();
      })

      this.video = videojs('video', {
        controls: true,
        responsive: true,
        enableSmoothSeeking: true,
        fluid: true,
        sources: [{
          src: this.data.videoUrl
        }]
      });

      if(this.data.imageUrl) {
        this.video.poster(this.data.imageUrl);
      }

      this.video.on('timeupdate', () => {
        const current = this.video.currentTime();
        if (!this.endTime)  {
          this.currentTime.emit(current);
          return;
        }
        if (current >= this.endTime) {
          this.video.pause();
          this.video.currentTime(0);
        }
      });
    }

  }

  ngOnDestroy(): void {
    if (this.video) {
      this.video.dispose();
    }
  }
}
