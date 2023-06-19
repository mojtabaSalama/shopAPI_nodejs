const express = require("express");
const router = express.Router();

const admin = require("../controllers/users/adminController");
const validAdmin = require("../middlewares/auth/adminAuth");

//routes ----
router.post("/login", admin.login);
router.post("/add", validAdmin, admin.add_admin);
router.post("/update", validAdmin, admin.update);
router.post("/removAdmin", validAdmin, admin.remove_admin);
router.get("/getAdmin", validAdmin, admin.getbyid);

router.post("/country", admin.add_country);

module.exports = router;
