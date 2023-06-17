const express = require("express");
const router = express.Router();
const multer = require("multer");

const product = require("../controllers/product/productController");
const validUser = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
//routes
router.post("/create", upload.single("file"), product.create);
router.post("/addCategory", product.add_category);
router.post("/image", upload.single("file"), product.updateImage);

module.exports = router;
