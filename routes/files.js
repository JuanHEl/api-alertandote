const { Router } = require("express");
const { uploadFile } = require("../controllers/files");
const { validatorJWT } = require("../middleware/validatorJWT");

const router = Router();

router.post("/upload", validatorJWT, uploadFile);

module.exports = router;
