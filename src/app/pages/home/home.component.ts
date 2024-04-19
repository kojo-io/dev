import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {User} from "../../shared/types/user";
import {HomeService} from "./home.service";
import {finalize} from "rxjs";
import {Course} from "../../shared/types/course";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  authenticated = false;
  user!: User;
  loadingCourse = false;
  courses: Course[] = [];
  constructor(private authService: AuthService,
              private service: HomeService) {
    this.authService.authenticated.subscribe({
      next: value => {
        this.authenticated = authService.authenticatedState;
        this.user = authService.user;
      }
    });

    this.authenticated = authService.authenticatedState;
    this.user = authService.user;
  }
  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.loadingCourse = true;
    this.service.getCourse()
      .pipe(finalize(() => this.loadingCourse = false))
      .subscribe({
        next: u => {
          this.courses = u.data;
        }
      })
  }
}
