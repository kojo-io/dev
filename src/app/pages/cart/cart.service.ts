import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../environment.service";
import {Observable} from "rxjs";
import {Cart} from "../../shared/types/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart[] =[];

  constructor(private httpClient: HttpClient, private env: EnvironmentService) { }

  getCart(): Observable<any> {
    return this.httpClient.get(`${this.env.apiUrl}Cart`);
  }

  addToCart(data: any): Observable<any> {
    return this.httpClient.post(`${this.env.apiUrl}Cart`, data);
  }

  removeFromCart(data: any): Observable<any> {
    return this.httpClient.delete(`${this.env.apiUrl}Cart/${data}`);
  }
}
