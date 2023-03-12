import { Router } from "express";
import { checkAuth, checkCargosPlacementDate } from "../midllewares";
import { CargosController } from "../controllers";
import { createCargoValidators, editCargoValidators } from "../validators";

const router = Router();

router.post(
  "/create",
  checkAuth,
  createCargoValidators,
  CargosController.create
);

router.get("/getUserCargos", checkAuth, CargosController.getUserCargos);

router.get("/getList", checkCargosPlacementDate, CargosController.getList);

router.get("/:id", CargosController.getCargoById);

router.patch(
  "/edit/:id",
  checkAuth,
  editCargoValidators,
  CargosController.edit
);

router.delete("/:id", checkAuth, CargosController.deleteCargoById);

export default router;
