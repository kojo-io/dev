import { Component } from '@angular/core';
import {ModalRef} from "toll-ui";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  passwordVisible = false;
  loading = false;

  constructor(public ref: ModalRef) {
  }
  showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

}
