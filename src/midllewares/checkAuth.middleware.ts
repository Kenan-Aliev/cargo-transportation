import { NextFunction, Request, Response } from "express";
import { MyRequest } from "../interfaces/Auth";
import { ApiError, Token } from "../utils";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const myRequest = req as MyRequest;
    const bearer = myRequest.headers.authorization;
    if (!bearer) {
      throw ApiError.UnAuthorizedError("Требуются заголовки для токена");
    }
    const token = bearer.split(" ")[1];
    const userData = Token.verify(token);
    myRequest.user = userData;
    next();
  } catch (err) {
    next(err);
  }
};
