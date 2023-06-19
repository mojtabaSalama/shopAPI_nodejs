const jwt = require("jsonwebtoken");
require("dotenv").config();

const validAdmin = (req, res, next, role) => {
  let token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Not Authorized , Please Login in " });
  }
  if (role == admin) {
    try {
      let decoded = jwt.verify(token, process.env.JWTSECRETADMIN);
      req.user = decoded;
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "token is not valid , loggin to get a valid on" });
    }
  }
  if (role == user) {
    try {
      let decoded = jwt.verify(token, process.env.JWTSECRETUSER);
      req.user = decoded;
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "token is not valid , loggin to get a valid on" });
    }
  }

  next();
};

module.exports = validAdmin;
