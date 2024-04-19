import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CheckoutService} from "./checkout.service";
import {CartService} from "../cart/cart.service";
import {AuthService} from "../../shared/auth.service";
import {AlertService, ModalRef, ModalService} from "toll-ui";
import {HomeService} from "../home/home.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit, AfterViewInit{
  countries: Array<any> = [];
  netWork: Array<any> = [];
  selectedCountry: any;
  paymentChannel: any;
  momo: any;
  cartTotal: number = 0;
  phoneNumber: any;

  constructor(private service: CheckoutService,
              private authService: AuthService,
              public cartService: CartService) {
    if(this.authService.getCartData()) {
      this.cartService.cart = JSON.parse(this.authService.getCartData());
    }
  }

  ngAfterViewInit(): void {
    this.cartService.cart.forEach(u => {
      console.log(u.price)
      this.cartTotal += u.price;
    });
  }
  ngOnInit(): void {
    this.service.getCountry()
      .subscribe({
        next: value => {
          this.countries = value;
        }
      });

    this.getNetWork();
  }

  selectCountry(id: any) {
    const country = this.countries.find(u => u.id === id);
    this.selectedCountry = country;
    console.log(country);
  }

  getNetWork() {
    this.service.getNetWork()
      .subscribe({
        next: value => {
          value.data.splice(3,1);
          this.netWork = value.data;
          console.log(this.netWork);
        }
      })
  }
}
