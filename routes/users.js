const express = require("express");
const router = express.Router();
const validUser = require("../../middlwares/auth");
const user = require("../../controllers/users/userController");
const newPassword = require("../../controllers/users/resetPasswordCont");

router.post("/secured/hidden/432651/register_new_admin", user.signup);

router.post("/login", user.login);

router.get("/get-user", validUser, user.getbyid);

router.post("/delete-user", user.delete);
//reset password here

module.exports = router;
