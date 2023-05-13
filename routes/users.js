const express = require("express");
const router = express.Router();
const user = require("../controllers/users/userController");
const validUser = require("../middlewares/auth");
const multer = require("multer");

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

router.post("/update", user.update);

router.post("/update-image", upload.single("file"), user.updateImage);

router.get("/get-user", validUser, user.getbyid);
//---------------------------

module.exports = router;
