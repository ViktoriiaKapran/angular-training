import { User } from "./user";

export class AuthUserResponse {
  user: User;
  token: string;
  success: boolean;
  errorMessage: string;
}