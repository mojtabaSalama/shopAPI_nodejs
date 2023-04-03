const db = require("../../models/index");
const Student = db.models.student;
const bcrypt = require("bcryptjs");
const xssFilter = require("xss-filters");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const user = {
  signup: async (req, res) => {
    try {
      let {
        name,
        phoneNum,
        email,
        password,
        level,
        deviceId,
        mobile_model,
        schoolId,
      } = req.body;

      //check req.body
      if (
        !(
          name &&
          phoneNum &&
          password &&
          level &&
          deviceId &&
          mobile_model &&
          schoolId
        )
      ) {
        return res
          .status(400)
          .json({ msg: "قم بادخال جميع الحقول \n please enter all fields" });
      }

      //check requirements
      if (phoneNum.length !== 10)
        return res
          .status(400)
          .json("رقم الهاتف غير صحيح \n wrong phone number");

      if (password.length < 6)
        return res
          .status(400)
          .json(
            "كلمة السر يجب ان لا تقل عن 6 احرف \n pssword must be at least 6 charachters"
          );

      //VERIFY PHONE WITH TWILIO --------------------------------------

      //-------------------------------------

      //filter list
      let data = [name, phoneNum, email, password, deviceId, mobile_model];
      //filtered data
      data.map((data) => {
        data = xssFilter.inHTMLData(data);
      });

      //make sure no admin is replicated
      let student = await Student.findOne({ where: { phoneNum } });
      if (student)
        return res
          .status(403)
          .json("الطالب موجود مسبقا \n student already exist");

      //hash user password
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);

      //CHECK LEVEL LENGTH
      //convert from json to array
      let _level = JSON.parse(level);

      let acc_numbers;
      _level.length > 1 ? (acc_numbers = _level.length) : (acc_numbers = 1);

      //save to database
      const newStudent = await Student.create({
        name,
        phoneNum,
        email,
        level: _level,
        deviceId,
        mobile_model,
        acc_numbers,
        password: hashedPassword,
        new_update: true,
      });

      //send to client
      res.json({
        student: {
          id: newStudent.id,
          phoneNum: newStudent.phoneNum,
          email: newStudent.email,
          name: newStudent.name,
          stauts: newStudent.status,
          level: newStudent.level,
          acc_numbers: newStudent.acc_numbers,
          deviceId: newStudent.deviceId,
          new_update: newStudent.new_update,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      let { phoneNum, password, deviceId } = req.body;

      if (!phoneNum || !password || !deviceId) {
        return res
          .status(400)
          .json({ msg: "قم بادخال جميع الحقول \n please enter all feilds" });
      }

      //filter input
      (phoneNum = xssFilter.inHTMLData(phoneNum)),
        (password = xssFilter.inHTMLData(password));
      deviceId = xssFilter.inHTMLData(deviceId);

      Student.findOne({ where: { phoneNum } }).then((user) => {
        if (!user) {
          return res
            .status(400)
            .json({ msg: "المستخدم غير موجود ! \n user not found !" });
        }
        // if (user.status !== true) return res.status(400).json("not verified");

        //deviceId
        if (deviceId !== user.deviceId) {
          if (user.allowed_devices === false) {
            return res
              .status(401)
              .json(
                "you are using a new phone please contact your school to be able to procceed \n انت تستخدم هاتف جديد الرجاء التواصل مع المدرسة لمواصلة الاجراء"
              );
          }
        }

        bcrypt.compare(password, user.password).then(async (isMatch) => {
          if (!isMatch) {
            return res
              .status(400)
              .json({ msg: "كلمة المرور غير صحيحة \n password is incorrect" });
          } else {
            //sign user
            let token = await jwt.sign({ id: user.id }, process.env.JWTSECRET);
            res.json({
              token,
              user: {
                id: user.id,
                phoneNum: user.phoneNum,
                email: user.email,
                name: user.name,
                stauts: user.status,
                level: user.level,
                acc_numbers: user.acc_numbers,
                deviceId: user.deviceId,
                isUpdate: user.new_update,
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
    Student.findOne({ where: { id: req.user.id } })
      .then((user) => {
        res.json({
          id: user.id,
          phoneNum: user.phoneNum,
          email: user.email,
          name: user.name,
          stauts: user.status,
          level: user.level,
          acc_numbers: user.acc_numbers,
          deviceId: user.deviceId,
          isUpdate: user.new_update,
        });
      })
      .catch((err) => console.log(err));
  },
};

module.exports = user;
