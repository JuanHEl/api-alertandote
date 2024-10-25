const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  nickname: {
    type: String,
    required: [true, "El nickname es obligatorio"],
    unique: [true, "El nickname debe ser unico"],
  },
  password: {
    type: String,
    required: [true, "La  contraseña es obligatorio"],
  },
});

UserSchema.methods.toJSON = function () {
  const { _v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
