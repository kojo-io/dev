import {Component, OnInit} from '@angular/core';
import {AlertService, ModalRef} from "toll-ui";
import {AuthService} from "../shared/auth.service";
import {finalize} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  passwordVisible = false;
  loading = false;
  form!:FormGroup;

  constructor(public ref: ModalRef,
              private authService: AuthService,
              private fb: FormBuilder,
              private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
  showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    this.authService.clearSessionData();
    this.authService.SetContentType({
      Authorization: `Bearer ${this.authService.token.token}`,
      Accept: 'application/json'
    });
    this.loading = true;
    this.authService.login(this.form.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: value => {
          if (value.status === 200) {
            this.setUserData(value.data);
            this.authService.SetContentType({
              Authorization: `Bearer ${this.authService.token.token}`,
              Accept: 'application/json'
            });
            this.ref.close();
            this.alertService.notify({ type: "success", message: value.message, title: 'Success' , duration: 10000})
          } else {
            this.alertService.notify({ type: "warning", message: value.message, title: 'Warning' , duration: 10000})
          }
        }, error: err => {
          this.alertService.notify({ type: "danger", message: 'Something went wrong please try again or contact support', title: 'Error' })
        }
      })
  }

  setUserData(result: any): void {
    this.authService.setSessionData(result);
  }
}
