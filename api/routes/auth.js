const express = require("express");

const { getUsers, Register, Login, Logout } = require("../controller/users");
const { verifyToken } = require("../middleware/VerifyToken");
const { refreshToken } = require("../controller/RefreshToken");

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

module.exports = router;
