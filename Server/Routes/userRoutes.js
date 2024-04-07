const express = require("express");
const router = express.Router();
const userApi = require("../Controller/userController");
const multer = require("multer");
const upload = multer();

router.get("/", userApi.getDataFromCookie);
router.post("/register", userApi.registerUser);
router.post("/login", userApi.userLogin);
router.patch("/update", userApi.userUpdate);
router.delete("/delete", userApi.userDelete);
router.get("/signout", userApi.signOut);

module.exports = router;
