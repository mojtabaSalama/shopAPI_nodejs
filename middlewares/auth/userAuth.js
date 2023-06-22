const jwt = require("jsonwebtoken");
require("dotenv").config();

const validUser = (req, res, next, role) => {
  let token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Not Authorized , Please Login in " });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWTSECRETUSER);
    global.req.user = decoded;
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "token is not valid , loggin to get a valid on" });
  }

  next();
};

module.exports = validUser;
