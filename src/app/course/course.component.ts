import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesService} from "../pages/courses/courses.service";
import {finalize, timer} from "rxjs";
import {Course} from "../shared/types/course";
import {CartService} from "../pages/cart/cart.service";
import {Cart} from "../shared/types/cart";
import {AuthService} from "../shared/auth.service";
import {AlertService} from "toll-ui";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit{
  paid = false;
  id = '';
  loading = false;
  loadingCourse = false
  course: Course | undefined;
  courses: Course[] = [];
  cart: Cart | undefined;
  constructor(private activatedRoute: ActivatedRoute,
              public cartService: CartService,
              private authService: AuthService,
              private alertService: AlertService,
              private service: CoursesService) {
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getCourse();
    this.getCourses();
    if(this.authService.getCartData()) {
      this.cartService.cart = JSON.parse(this.authService.getCartData());
      this.cart = this.cartService.cart.find(u => u.courseId === this.id) as Cart;
    }
  }

  getCourse() {
    this.loading = true;
    this.service.getCourse(this.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: u => {
          this.course = u.data;
        }
      })
  }

  addToCart(course: Course | undefined) {
    const find = this.cartService.cart.find(u => u.courseId === course?.id) as Cart;
    if (!find) {
      this.cart = <Cart>{
        id: "",
        price: course?.video?.price,
        course: course,
        userId: "",
        courseId: course?.id
      }
      this.cartService.cart.push(this.cart);

      this.authService.setCartData(JSON.stringify(this.cartService.cart));

      this.cartService.addToCart({price: this.cart.price, courseId: this.cart.courseId})
        .subscribe({
          next: value => {
            if(value.status !== 200) {
              this.alertService.notify({ type: "warning", message: value.message, title: 'Warning' , duration: 10000})
            }
          }
        })
    }
  }

  removeItem(id: any) {
    const index = this.cartService.cart.findIndex(u => u.courseId === id);
    const cart = this.cartService.cart.find(u => u.courseId === id) as Cart;
    if (cart.id) {
      this.cartService.removeFromCart(cart.id)
        .subscribe({
          next: value => {
            if(value.status !== 200) {
              this.alertService.notify({ type: "warning", message: value.message, title: 'Warning' , duration: 10000})
            }
          }
        })
    }
    this.cartService.cart.splice(index, 1);
    this.cart = undefined;
    this.authService.setCartData(JSON.stringify(this.cartService.cart));
  }

  getCourses() {
    this.loadingCourse = true;
    this.service.getCourses()
      .pipe(finalize(() => this.loadingCourse = false))
      .subscribe({
        next: u => {
          this.courses = u.data;
        }
      })
  }

  routeCourse(id: string) {
    window.location.href = `/courses/${id}`;
  }
}
