import { body } from "express-validator";

export const editProfileValidators = [
  body("email")
    .isEmail()
    .withMessage("Введите корректный email. Пример user@gmail.com")
    .normalizeEmail()
    .optional({ nullable: true }),
  body("name")
    .isString()
    .withMessage("Имя должно быть строкой")
    .trim()
    .optional({ nullable: true }),
  body("surname")
    .isString()
    .withMessage("Фамилия должна быть строкой")
    .trim()
    .optional({ nullable: true }),
  body("phone")
    .isString()
    .withMessage("Номер телефона должен быть строкой")
    .trim()
    .optional({ nullable: true }),
  body("password")
    .isLength({
      min: 9,
      max: 20,
    })
    .withMessage(
      "Длина пароля должна быть минимум 9 символов и максимум 20 символов"
    )
    .isAlphanumeric()
    .trim()
    .optional({ nullable: true }),

  body("whatsapp")
    .isString()
    .withMessage("Вотсап должен быть строкой")
    .optional({ nullable: true }),

  body("telegram")
    .isString()
    .withMessage("Телеграм должен быть строкой")
    .optional({ nullable: true }),
];
