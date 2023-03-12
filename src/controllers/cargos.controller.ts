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

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const myRequest = req as AuthorizedRequest;
      const validationErrors = validationResult(myRequest);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = myRequest.body;
      const { id: cargoId } = myRequest.params;
      const response = await cargosServices.edit(Number(cargoId), data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const { city, startDate, endDate } = req.query;
      if (!startDate && endDate) {
        throw ApiError.ClientError("Укажите начальную дату");
      }
      const response = await cargosServices.getList(
        city ? String(city) : "",
        startDate ? String(startDate) : "",
        endDate ? String(endDate) : ""
      );
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

  async getCargoById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await cargosServices.getCargoById(Number(id));
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async deleteCargoById(req: Request, res: Response, next: NextFunction) {
    try {
      const myRequest = req as AuthorizedRequest;
      const { id } = myRequest.params;
      const response = await cargosServices.deleteCargoById(
        Number(id),
        myRequest.user.id
      );
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new CargosController();
