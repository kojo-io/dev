import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../environment.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient, private env: EnvironmentService) { }

  getCourseLevels(): Observable<any> {
    return this.httpClient.get(`${this.env.apiUrl}Account/GetCourseLevels`);
  }

  saveCourse(data: any): Observable<any> {
    return this.httpClient.post(`${this.env.apiUrl}Course`, data);
  }

  editCourse(data: any): Observable<any> {
    return this.httpClient.put(`${this.env.apiUrl}Course`, data);
  }

  getAllPaginated(pageSize?: any, pageNumber?: any, search?: string): Observable<any> {
    return this.httpClient.get(`${this.env.apiUrl}Course?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search ?? ''}`);
  }

  getCourse() {
    return this.httpClient.get(`${this.env.apiUrl}Course/GetCourses`);
  }
}
