import { body } from "express-validator";

export const editCargoValidators = [
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
    .withMessage(
      "Контакты должны быть массивом и массив должен содержать как минимум один элемент"
    )
    .custom((value) => {
      return value.every((contact: any) => {
        return typeof contact === "object";
      });
    })
    .withMessage("Контакты должны быть массивом объектов")
    .custom((value) => {
      return value.every((contact: any) => {
        return (
          Object.keys(contact).includes("id") &&
          Object.keys(contact).includes("contact")
        );
      });
    })
    .withMessage("Объекты контактов должны содержать ключи id и contact"),
];
