const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 8080;

    this.userPath = "/api/user";
    this.authPath = "/api/auth";
    this.filesPath = "/api/files";

    // Conexion a la base
    this.connectDB();

    //Middlewares
    this.middleware();

    // Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );

    //Rutas de la aplicacion
    this.routes();
  }

  // Función que llama a la función de conexión a la BD
  async connectDB() {
    await dbConnection();
  }

  middleware() {
    //CORS
    this.app.use(cors());

    // Parseo del body a formato JSON
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    // Definición de rutas
    this.app.use(this.userPath, require("../routes/user")); //Apunta a las rutas del archivo user
    this.app.use(this.authPath, require("../routes/auth")); //Ruta para loggeo
    this.app.use(this.filesPath, require("../routes/files")); //Apunta a las rutas del archivo file
  }

  listen() {
    // Servidor corriendo
    this.app.listen(this.PORT, () => {
      console.log(`Servidor corriendo en el puerto ${this.PORT}`);
    });
  }
}
module.exports = Server;
