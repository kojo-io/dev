import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent {
  title = 'Confirm Checkout';
  subTitle = 'Please click on the button to complete the payment process';
  buttonText = 'I HAVE PAID';
  icon = 'assets/exclamation-mark.png';
  status = false;

  successUpdate() {
    this.title = 'Payment Confirmed';
    this.subTitle = 'Payment has been successfully updated.';
    this.buttonText = 'GO BACK';
    this.icon = 'assets/check.png';
  }

  errorUpdate() {
    this.title = 'Payment Failed';
    this.subTitle = 'Payment was not successfully.';
    this.buttonText = 'GO BACK';
    this.icon = 'assets/close-option.png';
  }
}

