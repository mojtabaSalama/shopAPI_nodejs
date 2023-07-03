const db = require("../../models/index");
const USER = db.models.user;
const Admin = db.models.admin;
const Country = db.models.admin_country;

const bcrypt = require("bcryptjs");
const xssFilter = require("xss-filters");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const admin = {
  add_admin: async (req, res) => {
    try {
      let { name, phone, email, password, adminCountryId } = req.body;

      //check req.body
      if (!(name && phone && password && email && adminCountryId)) {
        return res.status(400).json({ msg: "please enter all fields" });
      }

      //check phone number
      if (phone.length != 10) return res.status(400).json("wrong phone number");

      if (password.length < 6)
        return res.status(400).json("pssword must be at least 6 charachters");

      //-------------------------------------

      //filter list
      let data = [name, phone, email, password, adminCountryId];
      //filtered data
      data.map((data) => {
        data = xssFilter.inHTMLData(data);
      });

      //make sure no admin is replicated
      let admin = await Admin.findOne({ where: { name } });
      if (admin) return res.status(403).json("user is already exist");

      //hash user password
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
      //save to database
      const newAdmin = await Admin.create({
        name,
        phone,
        email,
        password: hashedPassword,

        adminCountryId,
      });

      //send to client
      res.json({
        admin: {
          id: newAdmin.id,
          phone: newAdmin.phone,
          email: newAdmin.email,
          name: newAdmin.name,
          adminCountryId: newAdmin.adminCountryId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      let { name, password } = req.body;

      if (!name || !password) {
        return res.status(400).json({ msg: "please enter all feilds" });
      }

      //filter input
      (name = xssFilter.inHTMLData(name)),
        (password = xssFilter.inHTMLData(password));

      // be sure admin is existed
      Admin.findOne({ where: { name } }).then((admin) => {
        if (!admin) {
          return res.status(400).json({ msg: "admin not found !" });
        }

        //password auth
        bcrypt.compare(password, admin.password).then(async (isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ msg: "password is incorrect" });
          } else {
            //sign admin
            let token = await jwt.sign(
              { id: admin.id },
              process.env.JWTSECRETADMIN
            );

            //send response
            res.json({
              token,
              admin: {
                id: admin.id,
                phone: admin.phone,
                email: admin.email,
                name: admin.name,
                adminCountryId: admin.adminCountryId,
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
    let { id } = req.body;
    if (!id) {
      return res.status(400).json({ msg: "please enter admin id" });
    }

    data = xssFilter.inHTMLData(id);

    Admin.findOne({ where: { id } })
      .then((admin) => {
        res.json({
          admin,
        });
      })
      .catch((err) => res.status(400).json("there is no admin with id given"));
  },
  update: async (req, res) => {
    try {
      const { name, password, email, phone, adminCountryId, id } = req.body;
      // check
      if (!(name && password && email && phone && adminCountryId, id))
        return res.status(400).json("enter all feilds");

      if (phone.length != 10) return res.status(400).json("wrong phone number");

      const admin = await Admin.findOne({ where: { id } });
      if (!admin)
        return res.status(400).json("there is no admin with id given");
      //hash user password
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);

      //update Admin
      let status = await Admin.update(
        {
          name,
          password: hashedPassword,
          email,
          phone,
          adminCountryId,
        },
        { where: { id } }
      );
      res.send(`updated admin successfully ${status}`);
    } catch (error) {
      if (error) throw error;
    }
  },
  remove_admin: async (req, res) => {
    let { id } = req.body;
    if (!id) {
      return res.status(400).json({ msg: "please enter admin id" });
    }

    data = xssFilter.inHTMLData(id);
    const admin = await Admin.findOne({ where: { id } });
    if (!admin) return res.status(400).json("there is no admin with id given");

    // console.log(id);
    Admin.destroy({ where: { id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "deleted successfully" });
        } else {
          res.send("can't delete");
        }
      })
      .catch((err) => {
        res.status(404).send({ message: err });
      });
  },
  add_country: async (req, res) => {
    try {
      let { country } = req.body;

      //check req.body
      if (!country) {
        return res.status(400).json({ msg: "please enter country name" });
      }

      data = xssFilter.inHTMLData(country);

      //make sure no admin is replicated
      let checkCountry = await Country.findOne({ where: { country } });
      if (checkCountry) return res.status(403).json("country is already exist");

      //save to database
      const newCountry = await Country.create({
        country,
      });

      //send to client
      res.json({
        country: {
          Country: newCountry.country,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  remove_country: async (req, res) => {
    let { id } = req.body;
    if (!id) {
      return res.status(400).json({ msg: "please enter country id" });
    }

    data = xssFilter.inHTMLData(id);
    const country = await Country.findOne({ where: { id } });
    if (!country)
      return res.status(400).json("there is no country with id given");

    Country.destroy({ where: { id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "deleted successfully" });
        } else {
          res.send("can't delete");
        }
      })
      .catch((err) => {
        res.status(404).send({ message: err });
      });
  },
  remove_user: async (req, res) => {
    let { id } = req.body;
    if (!id) {
      return res.status(400).json({ msg: "please enter user id" });
    }

    data = xssFilter.inHTMLData(id);
    const user = await USER.findOne({ where: { id } });
    if (!user) return res.status(400).json("there is no user with id given");

    USER.destroy({ where: { id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "deleted successfully" });
        } else {
          res.send("can't delete");
        }
      })
      .catch((err) => {
        res.status(404).send({ message: err });
      });
  },
};
module.exports = admin;
