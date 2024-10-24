const { Router } = require("express");
const {
  fileGet,
  filePost,
  filePut,
  fileDelete,
  uploadFile,
} = require("../controllers/files");

const router = Router();

router.get("/", fileGet);

router.put("/:id", filePut);

router.post("/", filePost);

router.delete("/", fileDelete);

router.post("/upload", uploadFile);

module.exports = router;
