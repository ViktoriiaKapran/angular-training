import { User } from "./user";

export class UserResponse {
  user: User;
  success: boolean;
  errorMessage: string;
}