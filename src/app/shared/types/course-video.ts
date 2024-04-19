import {Course} from "./course";

export type CourseVideo = {
  id: string;
  title: string;
  videoUrl: string;
  videoId: string;
  imageId: string;
  imageUrl: string;
  course: Course
  price: number;
  createTime: Date;
  courseId: string;
}
