const express = require("express");
const router = express.Router();
const user = require("../controllers/users/orderController");
const validUser = require("../middlewares/auth/userAuth");

const validAdmin = require("../middlewares/auth/adminAuth");

//routes -------------------
router.post("/signup", user.signup);

//---------------------------

module.exports = router;
