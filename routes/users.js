const express = require("express");
const router = express.Router();
const student = require("../controllers/users/studentController");
const validUser = require("../middlewares/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//routes -------------------
router.post("/signup", student.signup);

router.post("/login", student.login);

router.post("/update", student.update);

router.post("/update-image", upload.single("file"), student.updateImage);

router.get("/get-user", validUser, student.getbyid);
//---------------------------

module.exports = router;
