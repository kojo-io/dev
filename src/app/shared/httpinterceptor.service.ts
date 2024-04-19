import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {
  contentType: any;
  constructor(public authService: AuthService,
              private router: Router) {
    authService.currentContent.subscribe(u => {
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
            this.authService.clearSessionData();
            this.router.navigate(['/']);
            return event;
          }else if (event.body.status === 103) {
            this.setUserData(event.body.data);
            this.authService.SetContentType({
              Authorization: `Bearer ${this.authService.token.token}`,
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
    this.authService.setSessionData(result);
  }
}
