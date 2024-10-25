const { request: req, response: res } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { genJWT } = require("../helpers/jwt");

const login = async (req, res) => {
  const data = req.body;
  try {
    // Verifica si existe el usuario con el Nickname
    const user = await User.findOne({ nickname: data.nickname });
    if (!user) {
      return res.status(404).json({ msg: "Nickname invalido" });
    }

    // Valida que la contraseña sea correcta
    const validPassword = bcryptjs.compareSync(data.password, user.password);
    if (!validPassword) {
      return res.status(404).json({ msg: "La contraseña es incorrecta" });
    }

    // Generar el JWT
    const token = await genJWT(user.id);
    return res.json({ user, token });
  } catch (error) {
    return res.status(404).json({ msg: error.msg });
  }
};

module.exports = {
  login,
};
