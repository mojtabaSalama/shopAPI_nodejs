const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require("./models/index");
require("dotenv").config();

//connect to database
(async () => {
  await db.sequelize.sync({ alter: true });
  console.log("Connected to MySQL");
})();

//route one
app.get("/", (req, res) => {
  res.send("working fine");
});
//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//setting up routes
app.use("/user", require("./routes/users"));

const Port = process.env.PORT || 4000;
app.listen(Port, () => console.log(`server running on port ${Port}`));
