import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
      };
    }
  }
}

export type UserType = "USER" | "BUSINESS";

export interface User {
  id?: number;
  name: string;
  email: string;
  role: UserType;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}
export interface DecodedToken {
  id: number;
  role: string;
}
