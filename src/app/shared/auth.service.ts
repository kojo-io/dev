import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = new Subject<boolean>();
  constructor() { }

}
