const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require("./models/index");
require("dotenv").config();

//connect to database
(async () => {
  await db.sequelize.sync();
  console.log("Connected to MySQL");
})();

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//setting up routes
app.use("/student", require("./routes/users"));
app.use("/exam", require("./routes/exams"));

const Port = process.env.PORT || 4000;
app.listen(Port, () => console.log(`server running on port ${Port}`));
