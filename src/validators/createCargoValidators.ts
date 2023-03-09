import { body } from "express-validator";

export const createCargoValidators = [
  body("name").isString().withMessage("Название груза должно быть строкой"),
  body("from")
    .isString()
    .withMessage("Адрес,откуда погружается груз должен быть строкой")
    .trim(),
  body("to")
    .isString()
    .withMessage("Адрес,куда отправляется груз должен быть строкой")
    .trim(),
  body("weight").isString().withMessage("Вес груза должен быть строкой").trim(),
  body("volume")
    .isString()
    .withMessage("Объем груза должен быть строкой")
    .trim(),
  body("transportType")
    .isString()
    .withMessage("Тип транспорта должен быть строкой"),
  body("shipmentDate")
    .isISO8601()
    .toDate()
    .withMessage("Дата погрузки должна быть датой"),
  body("price").isNumeric().withMessage("Цена должна быть числом"),
  body("contacts")
    .isArray({ min: 1 })
    .withMessage("Контакты должны быть массивом строк"),
];
