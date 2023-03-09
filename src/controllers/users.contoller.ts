import { NextFunction, Request, Response } from "express";
import { usersServices } from "../services";
import { validationResult } from "express-validator";
import { ApiError } from "../utils";
import { AuthorizedRequest } from "../interfaces/Auth";

class UsersController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
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
      const myRequest = req as AuthorizedRequest;
      const response = await usersServices.getUserProfile(myRequest.user);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async editProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const myRequest = req as AuthorizedRequest;
      const validationErrors = validationResult(myRequest);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = myRequest.body;
      const response = await usersServices.editProfile(myRequest.user.id, data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
