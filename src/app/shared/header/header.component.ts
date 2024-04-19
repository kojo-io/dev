import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../auth.service";
import {User} from "../types/user";
import {Router} from "@angular/router";
import {CartService} from "../../pages/cart/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() onLoginClick = new EventEmitter();
  @Output() onRegisterClick = new EventEmitter();
  @Output() onRouteChange = new EventEmitter();
  authenticated = false;
  user!: User;

  constructor(private authService: AuthService,
              public cartService: CartService,
              private router: Router) {
    this.authService.authenticated.subscribe({
      next: value => {
        this.authenticated = authService.authenticatedState;
        this.user = authService.user;
      }
    });

    this.authenticated = authService.authenticatedState;
    this.user = authService.user;
  }

  login() {
    this.onLoginClick.emit();
  }

  register() {
    this.onRegisterClick.emit();
  }

  logout() {
    this.authService.logout();
    this.authService.clearSessionData();
    this.router.navigate(['/']);
  }
}
