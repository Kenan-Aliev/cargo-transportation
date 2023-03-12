import { Request } from "express";

export interface User {
  id?: number;
  email: string;
  name: string;
  surname: string;
  phone: string;
  password: string;
  whatsapp?: string;
  telegram?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MyToken {
  id: number;
  email: string;
}

export interface AuthorizedRequest extends Request {
  user: MyToken;
}

export interface EditUser {
  email?: string;
  name?: string;
  surname?: string;
  phone?: string;
  password?: string;
  whatsapp?: string;
  telegram?: string;
}
