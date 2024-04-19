import {Component, OnInit} from '@angular/core';
import {Cart} from "../../shared/types/cart";
import {CartService} from "./cart.service";
import {finalize} from "rxjs";
import {HomeService} from "../home/home.service";
import {Course} from "../../shared/types/course";
import {AuthService} from "../../shared/auth.service";
import {AlertService} from "toll-ui";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  loading = false;
  loadingCourse = false;
  cart: Cart[] = [];
  courses: Course[] = [];
  cartTotal: number = 0;

  constructor(public service: CartService,
              private authService: AuthService,
              private alertService: AlertService,
              private homeService: HomeService) {
    if(this.authService.getCartData()) {
      this.service.cart = JSON.parse(this.authService.getCartData());
    }
  }

  ngOnInit(): void {
    this.getCart();
    this.getCourses();
    this.service.cart.forEach(u => {
      this.cartTotal += u.price;
    });
  }

  removeItem(id: any) {
    const index = this.service.cart.findIndex(u => u.courseId === id);
    const cart = this.service.cart.find(u => u.courseId === id) as Cart;
    if (cart.id) {
      this.service.removeFromCart(cart.id)
        .subscribe({
          next: value => {
            if(value.status !== 200) {
              this.alertService.notify({ type: "warning", message: value.message, title: 'Warning' , duration: 10000})
            }
          }
        })
    }
    this.service.cart.splice(index, 1);
    this.authService.setCartData(JSON.stringify(this.service.cart));
    this.cartTotal = 0;
    this.service.cart.forEach(u => {
      this.cartTotal += u.price;
    });
  }

  getCart() {
    this.loading = true;
    this.service.getCart()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: u => {
          this.service.cart = u.data;
          this.cartTotal = 0;
          this.service.cart.forEach(u => {
            this.cartTotal += u.price;
          });
        }
      })
  }

  getCourses() {
    this.loadingCourse = true;
    this.homeService.getCourse()
      .pipe(finalize(() => this.loadingCourse = false))
      .subscribe({
        next: u => {
          this.courses = u.data;
        }
      })
  }
}
