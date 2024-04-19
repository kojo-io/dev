import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../environment.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient, private env: EnvironmentService) { }

  getAllPaginated(pageSize?: any, pageNumber?: any, search?: string): Observable<any> {
    return this.httpClient.get(`${this.env.apiUrl}Course/GetAllCourse?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search ?? ''}`);
  }

  getCourse(id: string): Observable<any> {
    return this.httpClient.get(`${this.env.apiUrl}Course/GetCourse/${id}`);
  }

  getCourses(): Observable<any> {
    return this.httpClient.get(`${this.env.apiUrl}Course/GetCourses`);
  }
}
