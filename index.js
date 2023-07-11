const express = require("express");
const app = express();

const cors = require("cors");
const db = require("./models/index");
const bodyParser = require("body-parser");
require("dotenv").config();

//connect to database
(async () => {
  await db.sequelize.sync(
    // { alter: true }
    { alter: true }
  );
  console.log("Connected to MySQL");
})();

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

//setting up routes
app.use("/user", require("./routes/users"));
app.use("/admin", require("./routes/admin"));

app.use("/product", require("./routes/product"));
app.use("/order", require("./routes/order"));

const Port = process.env.PORT || 4000;
app.listen(Port, () => console.log(`server running on port ${Port}`));
