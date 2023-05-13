const express = require("express");
const router = express.Router();

const admin = require("../controllers/users/adminController");
const validUser = require("../middlewares/auth");

//routes ----
router.post("/login", admin.login);
router.post("/add", validUser, admin.add_admin);
router.post("/update", validUser, admin.update);
router.post("/removAdmin", validUser, admin.remove_admin);
router.get("/getAdmin", validUser, admin.getbyid);

router.post("/country", admin.add_country);

module.exports = router;
