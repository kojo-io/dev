import {Course} from "./course";
import {User} from "./user";

export type Cart = {
  id: string;
  course?: Course;
  courseId: string;
  price: number;
  user?: User;
  userId: string;
}
