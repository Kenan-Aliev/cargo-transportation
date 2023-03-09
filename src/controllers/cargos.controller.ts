import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils";
import { AuthorizedRequest } from "../interfaces/Auth";
import { cargosServices } from "../services";

class CargosController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const myRequest = req as AuthorizedRequest;
      const validationErrors = validationResult(myRequest);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = myRequest.body;
      const repsonse = await cargosServices.create(myRequest.user.id, data);
      return res.json(repsonse);
    } catch (err) {
      next(err);
    }
  }

  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await cargosServices.getList();
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getUserCargos(req: Request, res: Response, next: NextFunction) {
    try {
      const myRequest = req as AuthorizedRequest;
      const response = await cargosServices.getUserCargos(myRequest.user.id);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new CargosController();
