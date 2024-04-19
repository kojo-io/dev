import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../environment.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = new Subject<boolean>();
  storageKey = 'static-forex37363shduwywiugyn-oisgher';
  cartKey = 'static-forex37363shcart373jfhf-oisgher';

  private contentSource = new BehaviorSubject<any>({
    Authorization: `Bearer ${this.token.token}`,
    Accept: 'application/json',
  });
  currentContent = this.contentSource.asObservable();
  constructor(private httpClient: HttpClient, private env: EnvironmentService) { }

  SetContentType(type : any): void {
    this.contentSource.next(type);
  }
  setSessionData(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    this.authenticated.next(true);
  }

  getCartData(): any {
    if (localStorage.getItem(this.cartKey)) {
      return JSON.parse(localStorage.getItem(this.cartKey) as string);
    }
    return false;
  }

  setCartData(data: any): void {
    localStorage.setItem(this.cartKey, JSON.stringify(data));
  }

  clearCartData(): void {
    localStorage.removeItem(this.cartKey);
  }

  get authenticatedState() {
    return this.user !== false;
  }

  get user() {
    if (this.getSessionData()) {
      return this.getSessionData().user;
    }
    return false;
  }

  get token() {
    if (this.getSessionData()) {
      return this.getSessionData().accesstoken;
    }
    return false;
  }

  getSessionData(): any {
    if (localStorage.getItem(this.storageKey)) {
      return JSON.parse(localStorage.getItem(this.storageKey) as string);
    }
    return false;
  }

  clearSessionData(): void {
    localStorage.removeItem(this.storageKey);
    this.authenticated.next(false);
  }

  logout(): Observable<any> {
    return this.httpClient.get(`${this.env.apiUrl}Account/Logout`);
  }

  changePassword(data: any): Observable<any> {
    return this.httpClient.post(`${this.env.apiUrl}Account/ChangePassword`, data);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.env.apiUrl}Account/AccountLogin`, data);
  }
}
