const db = require("../../models/index");
const User = db.models.user;

const bcrypt = require("bcryptjs");
const xssFilter = require("xss-filters");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { checkPrimeSync } = require("crypto");
require("dotenv").config();

const user = {
  signup: async (req, res) => {
    try {
      let { name, phoneNum, email, password } = req.body;

      //check req.body
      if (!(name && phoneNum && password && email)) {
        return res.status(400).json({ msg: " please enter all fields" });
      }

      //check requirements
      if (phoneNum.length !== 10)
        return res.status(400).json("wrong phone number");

      if (password.length < 6)
        return res.status(400).json(" pssword must be at least 6 charachters");

      //VERIFY PHONE WITH TWILIO --------------------------------------

      //-------------------------------------

      //filter list
      let data = [name, phoneNum, email, password];
      //filtered data
      data.map((data) => {
        data = xssFilter.inHTMLData(data);
      });

      //make sure no admin is replicated
      let user = await User.findOne({ where: { email } });
      if (user) return res.status(403).json("student already exist");

      //hash user password
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);

      //save to database
      const newUser = await User.create({
        name,
        phoneNum,
        email,

        password: hashedPassword,
      });

      //send to client
      res.json({
        user: {
          id: newUser.id,
          phoneNum: newUser.phoneNum,
          email: newUser.email,
          name: newUser.name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: "please enter all feilds" });
      }

      //filter input
      (phoneNum = xssFilter.inHTMLData(phoneNum)),
        (password = xssFilter.inHTMLData(password));
      deviceId = xssFilter.inHTMLData(deviceId);

      User.findOne({ where: { email } }).then((user) => {
        if (!user) {
          return res.status(400).json({ msg: "user not found !" });
        }

        bcrypt.compare(password, user.password).then(async (isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ msg: "password is incorrect" });
          } else {
            //sign user
            let token = await jwt.sign({ id: user.id }, process.env.JWTSECRET);

            //send response
            res.json({
              token,
              user: {
                id: user.id,
                phoneNum: user.phoneNum,
                email: user.email,
                name: user.name,
              },
            });
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  getbyid: async (req, res) => {
    User.findOne({ where: { id: req.user.id } })
      .then((user) => {
        res.json({
          id: user.id,
          phoneNum: user.phoneNum,
          email: user.email,
          name: user.name,
        });
      })
      .catch((err) => console.log(err));
  },
  update: async (req, res) => {
    try {
      const { name, password, email, phoneNum } = req.body;
      // check
      if (!(name && password && email && phoneNum))
        return res.status(400).json("enter all feilds");

      if (phoneNum.length !== 10)
        return res.status(400).json("wrong phone number");
      //hash user password
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);

      //update User
      let status = await User.update(
        { name, password: hashedPassword, email, phoneNum },
        { where: { id } }
      );
      res.send(`updated user successfully ${status}`);
    } catch (error) {
      if (error) throw error;
    }
  },
  updateImage: async (req, res) => {
    try {
      let { filename } = req.file;
      let { id } = req.body;

      // check if file is an image
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!allowedTypes.includes(req.file.mimetype)) {
        fs.unlink(
          path.join(__dirname, `../../public/images/${filename}`),
          (err) => {
            if (err) throw err;
            console.log("deleted type is not image");
          }
        );
        return res.status(400).json("File is not an image");
      }

      //check request
      if (!id) return res.status(400).json("add your id");

      //check user
      const user = await User.findOne({ where: { id } });

      //check if user already has an image
      let filePath = path.join(
        __dirname,
        `../../public/images/${user.ImgLink}`
      );

      if (fs.existsSync(filePath)) {
        //delete from fs system
        fs.unlink(filePath, (err) => {
          if (err) console.log(err);
          console.log("deleted from fs successfully");
        });
        //save the new link
        user.ImgLink = filename;
        await user.save();
        res.json({ user });
      } else {
        user.ImgLink = filename;
        await user.save();
        res.json({ user });
      }
    } catch (error) {
      if (error) throw error;
    }
  },
};

module.exports = user;
