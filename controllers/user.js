const { request: req, response: res } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.js");

const userController = async (req, res) => {};

const userPost = async (req, res) => {
  try {
    const body = req.body;
    const user = new User(body);

    const existNickName = await User.findOne({ nickname: body.nickname });
    if (existNickName) {
      return res.status(400).json({ msg: "El nickname ya existe" });
    }

    //   Cifrar pasword
    const psw = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(body.password, psw);

    await user.save();

    return res.json({ user });
  } catch (error) {
    return res.status(404).json({
      msg: error.msg,
    });
  }
};

module.exports = {
  userController,
  userPost,
};
