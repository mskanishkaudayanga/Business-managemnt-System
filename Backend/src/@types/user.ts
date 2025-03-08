export type UserType = "USER" | "BUSINESS";

export interface User {
  name: string;
  email: string;
  role: UserType;
  password: string;
}
