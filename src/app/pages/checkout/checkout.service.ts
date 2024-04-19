import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../environment.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient, private env: EnvironmentService) {}

  getCountry(): Observable<any> {
    return this.httpClient.get(`${this.env.apiUrl}Country`);
  }

  getNetWork(): Observable<any> {
    return this.httpClient.get(`${this.env.apiUrl}Account/GetNetworks`);
  }
}
