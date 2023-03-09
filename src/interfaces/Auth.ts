import { Request as ExpressRequest, Request } from "express";
import { JwtPayload } from "jsonwebtoken";

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

export interface MyRequest extends Request {
  user: MyToken;
}
