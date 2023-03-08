import { Router } from "express";
import { UsersController } from "../controllers";
import { registerValidators } from "../utils";
const router = Router();

router.post("/registration", registerValidators, UsersController.signUp);

export default router;
