import { Router } from "express";
import { checkAuth } from "../midllewares";
import { CarsController } from "../controllers";
import { createCarValidators } from "../validators";

const router = Router();

router.post("/create", checkAuth, createCarValidators, CarsController.create);

router.get("/getUserCars", checkAuth, CarsController.getUserCars);

router.get("/getList", CarsController.getList);

router.get("/:id", CarsController.getCarById);

router.delete("/:id", checkAuth, CarsController.deleteCarById);

export default router;
