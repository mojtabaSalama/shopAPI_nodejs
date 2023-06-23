const express = require("express");
const router = express.Router();
const order = require("../controllers/product/orderController");
const validUser = require("../middlewares/auth/userAuth");

const validAdmin = require("../middlewares/auth/adminAuth");

//routes -------------------
router.post("/", validUser, order.order);

router.post("/change_status", validAdmin, order.change_status);
router.post("/cancel_order", validUser, order.cancel_order);

//---------------------------

module.exports = router;
