import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ModalRef} from "toll-ui";
import {User} from "../shared/types/user";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  collapse = false;
  date = new Date();
  header = '';
  form!: FormGroup;
  myModal!: ModalRef;
  loading = false;
  authenticated = false;
  user!: User;

  constructor(private authService: AuthService) {
    this.authService.authenticated.subscribe({
      next: value => {
        this.authenticated = value;
      }
    });

    this.authenticated = authService.authenticatedState;
    this.user = authService.user;
  }

  collapseSide() {
    this.collapse = !this.collapse;
  }
}
