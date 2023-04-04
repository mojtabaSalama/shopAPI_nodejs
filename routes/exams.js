const express = require("express");
const router = express.Router();
const quiz = require("../controllers/exams/quizController");

//routes -------------------
router.get("/get-schools", quiz.getSchools);

//---------------------------

module.exports = router;
