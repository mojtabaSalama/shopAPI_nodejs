const express = require("express");
const router = express.Router();
const student = require("../controllers/users/studentController");
const validUser = require("../middlewares/auth");

router.post("/signup", student.signup);

router.post("/login", student.login);

router.get("/get-user", validUser, student.getbyid);

module.exports = router;
