const mongoose = require("mongoose");

// Función de configuración de conexion a la bd
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("DB online");
  } catch (error) {
    throw new Error("Error en la db");
  }
};

module.exports = {
  dbConnection,
};
