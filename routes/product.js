const express = require("express");
const router = express.Router();

const product = require("../controllers/product/productController");
const validUser = require("../middlewares/auth");

//routes
router.post("/create", product.create);

module.exports = router;
