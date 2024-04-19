import {Component, OnInit} from '@angular/core';
import {CartService} from "./pages/cart/cart.service";
import {AuthService} from "./shared/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'e-learning';

  constructor(private cartService: CartService,
              private authService: AuthService) {
  }
  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: value => {
        this.cartService.cart = value.data;
        this.authService.setCartData(JSON.stringify(this.cartService.cart));
      }
    })
  }
}
