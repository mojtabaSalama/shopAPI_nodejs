const express = require("express");
const router = express.Router();
const multer = require("multer");

const product = require("../controllers/product/productController");
const validAdmin = require("../middlewares/auth/adminAuth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  file: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
//routes
router.post("/create", validAdmin, upload.single("file"), product.create);
router.post("/addCategory", validAdmin, product.add_category);
router.post("/image", validAdmin, upload.single("file"), product.updateImage);
router.post("/update", validAdmin, product.updateProduct);
router.post("/remove_product", validAdmin, product.remove_product);
router.post("/remove_category", validAdmin, product.remove_category);

module.exports = router;
