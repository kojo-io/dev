import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  authenticated = true;
  constructor(private authService: AuthService) {
    this.authService.authenticated.subscribe({
      next: value => {
        this.authenticated = value;
      }
    })
  }
  ngOnInit(): void {
  }

}
