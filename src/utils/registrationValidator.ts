import { body } from "express-validator";

export const registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Введите корректный email. Пример user@gmail.com")
    .normalizeEmail(),
  body("name").isString().withMessage("Имя должно быть строкой").trim(),
  body("surname").isString().withMessage("Фамилия должна быть строкой").trim(),
  body("phone")
    .isString()
    .withMessage("Номер телефона должен быть строкой")
    .trim(),
  body("password")
    .isLength({
      min: 9,
      max: 20,
    })
    .withMessage(
      "Длина пароля должна быть минимум 9 символов и максимум 20 символов"
    )
    .isAlphanumeric()
    .trim(),

  body("whatsapp")
    .isString()
    .withMessage("Вотсап должен быть строкой")
    .optional({ nullable: true }),

  body("telegram")
    .isString()
    .withMessage("Телеграм должен быть строкой")
    .optional({ nullable: true }),
];
