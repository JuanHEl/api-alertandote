const path = require("path");

const uploadFileHelper = (files) => {
  try {
    const { file } = files;
    const extension = file.name.split(".");
    const date = new Date();
    const today = date.toISOString().replaceAll(":", "-").split(".")[0];

    // Obtener archivo y guardarlo en la ruta local
    const uploadPath = path.join(
      __dirname,
      "../uploads",
      `${today}.${extension[extension.length - 1]}`
    );
    file.mv(uploadPath, (err) => {
      if (err) throw new Error(err.message);
    });
    return `${today}.${extension[extension.length - 1]}`;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  uploadFileHelper,
};
