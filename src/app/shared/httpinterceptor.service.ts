import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {
  contentType: any;
  constructor(public baseService: BaseService,
              private router: Router) {
    baseService.currentContent.subscribe(u => {
      this.contentType = u;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: this.contentType
    });

    // @ts-ignore
    return next.handle(request).pipe(
      map(event => {
        if ( event instanceof HttpResponse) {
          if (event.body.status === 102) {
            this.baseService.clearSessionData();
            this.router.navigate(['/auth/login']);
            return event;
          }else if (event.body.status === 103) {
            this.setUserData(event.body.data);
            this.baseService.SetContentType({
              Authorization: `Bearer ${this.baseService.getToken().token}`,
              Accept: 'application/json'
            });
            return event;
          } else {
            return event;
          }
        } else {
          return event;
        }
      })
    );
  }

  setUserData(result: any): void {
    this.baseService.setSessionData(result);
  }
}
