const { request: req, response: res } = require("express");
const { uploadFileHelper } = require("../helpers/uploadFiles");

const fileGet = (req, res) => {
  res.json({
    success: true,
    msg: "GET api",
  });
};

const filePut = (req, res) => {
  const id = req.params.id;
  res.status(400).json({
    success: false,
    msg: "PUT api",
    id,
  });
};

const filePost = ({ body }, res) => {
  res.status(200).json({
    success: true,
    msg: "POST api",
    data: body,
  });
};

const fileDelete = (req, res) => {
  res.json({
    success: true,
    msg: "DELETE api",
  });
};

const uploadFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ msg: "No se han seleccionado archivos" });
  }
  const name = await uploadFileHelper(req.files);
  return res.json({ name });
};

module.exports = {
  fileGet,
  filePost,
  filePut,
  fileDelete,
  uploadFile,
};
