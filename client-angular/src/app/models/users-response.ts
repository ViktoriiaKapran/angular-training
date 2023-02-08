import { User } from "./user";

export class UsersResponse {
  users: User[];
  success: boolean;
  errorMessage: string;
}