import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils";
import { AuthorizedRequest } from "../interfaces/Auth";
import { carsServices } from "../services";

class CarsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const myRequest = req as AuthorizedRequest;
      const validationErrors = validationResult(myRequest);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = myRequest.body;
      const repsonse = await carsServices.create(myRequest.user.id, data);
      return res.json(repsonse);
    } catch (err) {
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const myRequest = req as AuthorizedRequest;
      const validationErrors = validationResult(myRequest);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = myRequest.body;
      const { id: carId } = myRequest.params;
      const response = await carsServices.edit(Number(carId), data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const { from, to, date, limit, page } = req.query;
      const response = await carsServices.getList(
        from ? String(from) : "",
        to ? String(to) : "",
        date ? String(date) : "",
        Number(limit),
        Number(page)
      );
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getUserCars(req: Request, res: Response, next: NextFunction) {
    try {
      const myRequest = req as AuthorizedRequest;
      const response = await carsServices.getUserCars(myRequest.user.id);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getCarById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await carsServices.getCarById(Number(id));
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async deleteCarById(req: Request, res: Response, next: NextFunction) {
    try {
      const myRequest = req as AuthorizedRequest;
      const { id } = myRequest.params;
      const response = await carsServices.deleteCarById(
        Number(id),
        myRequest.user.id
      );
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new CarsController();
