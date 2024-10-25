const { response: res, request: req } = require("express");
const jwt = require("jsonwebtoken");
const validatorJWT = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(400).json({ msg: "No existe clave de verificacion" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Token invalido" });
  }
};

module.exports = { validatorJWT };
