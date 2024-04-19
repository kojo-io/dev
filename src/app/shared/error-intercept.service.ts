import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BaseService} from './base.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptService implements HttpInterceptor{

  constructor(public baseService: BaseService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // @ts-ignore
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.log(error.status);
            return  throwError(error.error.message);
          } else {
            if (error.status === 401 || error.status === 100) {
              this.baseService.clearSessionData();
              this.router.navigate(['/auth/login']);
            }
          }
        })
    );
  }
}
