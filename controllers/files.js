const { request: req, response: res } = require("express");
const { uploadFileHelper } = require("../helpers/uploadFiles");
const User = require("../models/user");

const uploadFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ msg: "No se han seleccionado archivos" });
  }
  try {
    if (req.uid) {
      const user = await User.findOne({ _id: req.uid });
      if (!user)
        return res.status(404).json({ msg: "Error al obtener ususario" });
    }
    const name = await uploadFileHelper(req.files);
    return res.json({ name });
  } catch (error) {
    return res.status(400).json({ msg: "Error al cargar archivos" });
  }
};

module.exports = {
  uploadFile,
};
