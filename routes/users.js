const express = require("express");
const router = express.Router();
const user = require("../controllers/users/userController");
const validUser = require("../middlewares/auth/userAuth");
const multer = require("multer");
const validAdmin = require("../middlewares/auth/adminAuth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//routes -------------------
router.post("/signup", user.signup);

router.post("/login", user.login);

router.post("/update", validUser, user.update);

router.post(
  "/update-image",
  validUser,
  upload.single("file"),
  user.updateImage
);

router.get("/get-user", validAdmin, user.getbyid); //think about it
//---------------------------

module.exports = router;
