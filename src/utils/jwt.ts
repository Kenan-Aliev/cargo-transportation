import jwt from "jsonwebtoken";
import { MyToken } from "../interfaces/Auth";
import { ApiError } from "./exceptions";

export class Token {
  static encrypt(id: number, email: string) {
    return jwt.sign({ id, email }, process.env.JWT_SECRET ?? "secretKey");
  }
  static verify(token: string) {
    let data: MyToken = {} as MyToken;
    jwt.verify(token, process.env.JWT_SECRET ?? "secretKey", (err, decoded) => {
      if (err) {
        throw ApiError.ValidationError(err.message);
      }
      data = decoded as MyToken;
    });
    return data;
  }
}
