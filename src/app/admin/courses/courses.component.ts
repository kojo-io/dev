import {Component, OnInit, ViewChild} from '@angular/core';
import {CourseVideo} from "../../shared/types/course-video";
import {ModalService} from "toll-ui";
import {UploadCourseComponent} from "./upload-course/upload-course.component";
import {AuthService} from "../../shared/auth.service";
import {CourseService} from "./course.service";
import {finalize} from "rxjs";
import {VideoPlayerComponent} from "../../shared/video-player/video-player.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  loading = false;
  pageSize = 10;
  pageNumber = 1;
  maindata: any;
  courses: any[] = [];
  video: any;

  @ViewChild('vidplayer', { static: false }) vidplayer!: any;
  constructor(private modal: ModalService,
              private service: CourseService) {
  }

  ngOnInit(): void {
    this.getCourses(this.pageSize, this.pageNumber);
  }

  getCourses(pageSize?: any, pageNumber?: any, search?: string) {
    this.loading = true;
    this.service.getAllPaginated(pageSize, pageNumber, search)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: u => {
          this.maindata = u;
          this.courses = u.data;
        }
      })
  }


  pageNumberChange = (event: number) => {
    this.pageNumber = event;
    this.getCourses(this.pageSize, this.pageNumber);
  }

  pageSizeChange = (event: number) => {
    this.pageSize = event;
    this.getCourses(this.pageSize, this.pageNumber);
  }

  openModal = () => {
   const modal = this.modal.open({
      content: UploadCourseComponent,
      backdropClose: true
    });

   modal.afterClosed$.subscribe({
     next: _ => {
       this.getCourses(this.pageSize, this.pageNumber);
     }
   })
  }

  openVideo = (vid: any) => {
    const modal = this.modal.open({
      content: this.vidplayer,
      backdropClose: true,
    });

    modal.afterOpened$.subscribe({
      next: _ => {
        this.video = vid;
      }
    })
  }

  editItem(data: any) {
    const modal = this.modal.open({
      content: UploadCourseComponent,
      backdropClose: true,
      data
    });

    modal.afterClosed$.subscribe({
      next: _ => {
        this.getCourses(this.pageSize, this.pageNumber);
      }
    })
  }
}
