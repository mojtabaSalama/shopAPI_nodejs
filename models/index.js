require("dotenv").config();
const Sequelize = require("sequelize");

//connecting to mysql
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: process.env.DIALECT,
  }
);

//initializing db object holding db_connection && db_models
let db = {};
db.sequelize = sequelize;
db.models = {};

//require the objects
let student = require("./Student")(sequelize, Sequelize.DataTypes);
let school = require("./School")(sequelize, Sequelize.DataTypes);
let subjects = require("./Subject")(sequelize, Sequelize.DataTypes);
let chapter = require("./Chapter")(sequelize, Sequelize.DataTypes);
let quiz = require("./Quiz")(sequelize, Sequelize.DataTypes);
let questions = require("./Questions")(sequelize, Sequelize.DataTypes);
let answer = require("./Answers")(sequelize, Sequelize.DataTypes);
let result = require("./Result")(sequelize, Sequelize.DataTypes);
let admin = require("./Admin")(sequelize, Sequelize.DataTypes);

// //sql relationship here -------------------------------

// school and quiz
school.hasMany(quiz);
quiz.belongsTo(school);
// school and student
school.hasMany(student);
student.belongsTo(school);
// school and subjects
school.hasMany(subjects);
subjects.belongsTo(school);
//school and result
school.hasMany(result);
result.belongsTo(school);

// student and quiz
student.hasMany(quiz);
quiz.belongsTo(student);
// student and result
student.hasMany(result);
result.belongsTo(student);

//subject and chapters
subjects.hasMany(chapter);
chapter.belongsTo(subjects);

//chapters and quiz
chapter.hasMany(questions);
questions.belongsTo(chapter);

//questions and answers
questions.hasMany(answer);
answer.belongsTo(questions);

//quiz and questions
quiz.hasMany(questions);
questions.belongsTo(quiz);
//quiz and resul
quiz.hasMany(result);
result.belongsTo(quiz);

// //-----------------------------------------------------

// //add to db models
db.models.student = student;
db.models.school = school;
db.models.subjects = subjects;
db.models.chapter = chapter;
db.models.quiz = quiz;
db.models.questions = questions;
db.models.answer = answer;
db.models.result = result;
db.models.admin = admin;

module.exports = db;
