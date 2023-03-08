import { NextFunction, Request, Response } from "express";
import { usersServices } from "../services";
import { validationResult } from "express-validator";
import { ApiError } from "../utils";

class UsersController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        console.log(validationErrors.array());
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = req.body;
      const newUser = await usersServices.signUp(data);
      return res.json(newUser);
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
