import {Component, OnInit} from '@angular/core';
import {CoursesService} from "./courses.service";
import {finalize} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../../shared/types/course";

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
  courses: Course[] = [];
  constructor(private service: CoursesService) {
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
}
