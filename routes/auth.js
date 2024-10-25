const { Router } = require("express");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");
const { userValidation } = require("../middleware/validatorUser");

const router = Router();

router.post(
  "/login",
  [
    check("nickname", "El nickname es necesario").notEmpty(),
    check("password", "El password es oligatorio").notEmpty(),
    userValidation,
  ],
  login
);

module.exports = router;
