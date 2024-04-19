import {AfterContentInit, Component, OnInit} from '@angular/core';
import {AlertService, ModalRef} from "toll-ui";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize, timer} from "rxjs";
import {CourseService} from "../course.service";
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-upload-course',
  templateUrl: './upload-course.component.html',
  styleUrl: './upload-course.component.css'
})
export class UploadCourseComponent implements OnInit, AfterContentInit{
  loading = false;
  form!: FormGroup;
  requirements: string[] = [];
  courseLevels: any[] = [];
  video: any;
  image: any;
  data: any;
  vid!: HTMLVideoElement;
  editState = false;
  hasVideo = false;
  hasImage = false;

  requirement: any;
  isPlaying = false;

  constructor(public ref: ModalRef,
              private courseService: CourseService,
              private alertService: AlertService,
              private fb: FormBuilder) {
  }

  ngAfterContentInit(): void {
    this.data = this.ref.modal.data;
    console.log(this.data);

    if (this.data) {
      this.editState = true;
      this.form.patchValue({
        id: this.data.id,
        level: this.data.level,
        description: this.data.description,
        title: this.data.title,
        price: this.data.video.price
      });

      this.requirements = this.data.requirements;
      this.videoSetup(this.data.video.videoUrl);
      this.imageSetup(this.data.video.imageUrl);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      level: 0,
      description: [null, Validators.required],
      title: [null, Validators.required],
      price: 0,
    });


    this.getCourses();
  }

  addRequirement() {
    if (!this.requirements.includes(this.requirement)) {
      this.requirements.push(this.requirement);
      this.requirement = '';
    }
  }

  removeRequirement(index: number) {
    this.requirements.splice(index, 1);
  }

  getCourses() {
    this.courseService.getCourseLevels().subscribe({
      next: value => {
        this.courseLevels = value.data;
        console.log(value.data);
      }
    });
  }

  onImageFileChange(file: any): void {
    if (file.target.files && file.target.files[0]) {
      console.log(file.target.files);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.hasImage = true;
        this.image = {
          docType: file.target.files[0].type,
          ext: String(file.target.files[0].type).split('/')[1],
          name: file.target.files[0].name,
          file: file.target.files[0],
          image: URL.createObjectURL(file.target.files[0]),
          local: true
        };

        reader.onloadend = () => {
          const image = document.getElementById('image') as HTMLImageElement;
          image.src = URL.createObjectURL(file.target.files[0]);
        }
      };
      reader.readAsArrayBuffer(file.target.files[0]);
    } else {
      // this.notify.createNotification('error', 'Response', 'Please select at least one file. Thank you', 'topLeft');
    }
  }

  playVideo() {
    if (this.isPlaying) {
      this.vid.pause();
    } else {
      this.vid.play();
    }
  }

  onVideoFileChange(file: any): void {
    if (file.target.files && file.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.hasVideo = true;
        this.video = {
          docType: file.target.files[0].type,
          ext: String(file.target.files[0].type).split('/')[1],
          name: file.target.files[0].name,
          file: file.target.files[0],
          local: true
        };

        reader.onloadend = () => {
          this.vid = document.getElementById('video') as HTMLVideoElement;
          this.vid.src = URL.createObjectURL(file.target.files[0])
        }
      };

      reader.readAsArrayBuffer(file.target.files[0]);
    } else {
      // this.notify.createNotification('error', 'Response', 'Please select at least one file. Thank you', 'topLeft');
    }
  }

  videoSetup(data: any) {
    this.hasVideo = true;

    timer(500).subscribe({
      next: _ => {
        this.vid = document.getElementById('video') as HTMLVideoElement;
        this.vid.src = data;

        this.vid.onpause = () => {
          this.isPlaying = !this.isPlaying;
        }

        this.vid.onplay = () => {
          this.isPlaying = !this.isPlaying;
        }
      }
    })
  }

  imageSetup(data: any) {
    this.hasImage= true;
    timer(500).subscribe({
      next: _ => {
        const image = document.getElementById('image') as HTMLImageElement;
        image.src = data;
      }
    })
  }

  save() {
    if (this.editState) {
      this.edit()
    } else {
      this.post();
    }
  }

  post() {
    this.loading = true;
    const formData = new FormData();

    Object.keys(this.form.value).forEach(key => {
      formData.append(key, this.form.value[key]);
    });

    if(!this.image) {
      this.alertService.notify({ type: "warning", message: 'Please select a display image for this course', title: 'Notification' , duration: 10000})
      return;
    }

    if(!this.video) {
      this.alertService.notify({ type: "warning", message: 'Please select a video for this course', title: 'Notification' , duration: 10000})
      return;
    }

    formData.append('videoUrl', this.video.file, this.video.name);
    formData.append('imageUrl', this.image.file, this.image.name);
    formData.append('requirement', JSON.stringify(this.requirements));

    this.courseService.saveCourse(formData)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe({
      next: value => {
        if (value.status === 200) {
          this.ref.close();
          this.alertService.notify({ type: "success", message: value.message, title: 'Notification' , duration: 10000})
        } else {
          this.alertService.notify({ type: "warning", message: value.message, title: 'Notification' , duration: 10000})
        }
      }
    })
  }

  edit() {
    this.loading = true;
    const formData = new FormData();

    Object.keys(this.form.value).forEach(key => {
      formData.append(key, this.form.value[key]);
    });


    if (this.video) {
      formData.append('videoUrl', this.video.file, this.video.name);
    }
    if (this.image) {
      formData.append('imageUrl', this.image.file, this.image.name);
    }
    formData.append('requirement', JSON.stringify(this.requirements));

    this.courseService.editCourse(formData)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: value => {
          if (value.status === 200) {
            this.ref.close();
            this.alertService.notify({ type: "success", message: value.message, title: 'Notification' , duration: 10000})
          } else {
            this.alertService.notify({ type: "warning", message: value.message, title: 'Notification' , duration: 10000})
          }
        }
      })
  }
}
