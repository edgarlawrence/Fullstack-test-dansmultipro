const express = require("express");
const {
  upload,
  getAllData,
  createData,
  findDataBySearch,
  getDataById,
} = require("../controller/jobs");
const { verifyToken } = require("../middleware/VerifyToken");

const router = express.Router();

router.get("/", verifyToken, getAllData);
router.get("/:id", verifyToken, getDataById);
router.get("/jobs/search", verifyToken, findDataBySearch);
router.post("/", upload, createData);

module.exports = router;
