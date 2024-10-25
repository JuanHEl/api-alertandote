const path = require("path");

const uploadFileHelper = (files) => {
  try {
    if (Object.keys(files).length > 1) {
      const names = [];
      Object.values(files).map((file, key) => {
        const extension = file.name.split(".");
        const date = new Date();
        names.push(pathAndMoveFile(date, extension, file, key.toString()));
      });
      return names;
    }
    const { file } = files;
    const extension = file.name.split(".");
    const date = new Date();
    return pathAndMoveFile(date, extension, file);
    return `${today}.${extension[extension.length - 1]}`;
  } catch (error) {
    return error.message;
  }
};

const pathAndMoveFile = (date, extension, file, number = "") => {
  const today = date.toISOString().replaceAll(":", "-").split(".")[0];

  // Obtener archivo y guardarlo en la ruta local
  const uploadPath = path.join(
    __dirname,
    "../uploads",
    `${number && number}${today}.${extension[extension.length - 1]}`
  );
  file.mv(uploadPath, (err) => {
    if (err) throw new Error(err.message);
  });
  return `${number && number}${today}.${extension[extension.length - 1]}`;
};

module.exports = {
  uploadFileHelper,
};
