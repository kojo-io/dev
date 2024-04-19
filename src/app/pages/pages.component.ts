import { Component } from '@angular/core';
import {ModalService} from "toll-ui";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
  constructor(private modalService: ModalService, private router: Router) {
  }

  openLogin() {
    this.modalService.open({
      content: LoginComponent
    });
  }

  openRegister() {
    this.modalService.open({
      content: RegisterComponent
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
