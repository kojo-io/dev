import {User} from "./user";
import {CourseVideo} from "./course-video";

export type Course = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  user?: User;
  userId: string;
  level: number;
  levelName: string;
  video?: CourseVideo
}
