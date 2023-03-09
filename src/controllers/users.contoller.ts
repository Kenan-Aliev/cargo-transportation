import { NextFunction, Request, Response } from "express";
import { usersServices } from "../services";
import { validationResult } from "express-validator";
import { ApiError } from "../utils";
import { MyRequest } from "../interfaces/Auth";

class UsersController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        console.log(validationErrors.array());
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = req.body;
      const repsonse = await usersServices.signUp(data);
      return res.json(repsonse);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const response = await usersServices.login(data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const { activationCode } = req.body;
      const response = await usersServices.activate(activationCode);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const myRequest = req as MyRequest;
      const response = await usersServices.getUserProfile(myRequest.user);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
