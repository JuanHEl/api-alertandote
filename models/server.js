const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;

    this.filesPath = "/api/files";

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
    this.app.use(this.filesPath, require("../routes/files")); //Apunta a las rutas del archivo file
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Servidor corriendo en el puerto ${this.PORT}`);
    });
  }
}
module.exports = Server;
