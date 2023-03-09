import { Router } from "express";
import { UsersController } from "../controllers";
import { checkAuth } from "../midllewares";
import { registerValidators, editProfileValidators } from "../validators";
const router = Router();

router.post("/registration", registerValidators, UsersController.signUp);

router.post("/login", UsersController.login);

router.post("/activate", UsersController.activate);

router.get("/profile", checkAuth, UsersController.getProfile);

router.patch(
  "/profile/edit",
  checkAuth,
  editProfileValidators,
  UsersController.editProfile
);

export default router;
