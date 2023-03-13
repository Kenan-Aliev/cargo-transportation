import { check } from "express-validator";

export const queryParamsValidators = [
  check("page").isString().withMessage("Укажите страницу").trim(),
  check("limit").isString().withMessage("Укажите лимит").trim(),
];
