const { Router } = require("express");
const { userPost } = require("../controllers/user");
const { check } = require("express-validator");
const { userValidation } = require("../middleware/validatorUser");

const routerUser = Router();

routerUser.post(
  "/",
  [
    check("name", "Debe enviar un nombre").notEmpty(),
    check("nickname", "Debe enviar un nickname").notEmpty(),
    check(
      "password",
      "Debe enviar una contraseña o debe ser mayor a 6 caracteres"
    )
      .notEmpty()
      .isLength({ min: 6 }),
    userValidation,
  ],
  userPost
);

module.exports = routerUser;
