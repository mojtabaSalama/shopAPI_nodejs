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
let user = require("./User")(sequelize, Sequelize.DataTypes);
let admin_country = require("./admin_country")(sequelize, Sequelize.DataTypes);
let product_category = require("./product_category")(
  sequelize,
  Sequelize.DataTypes
);
let order = require("./order")(sequelize, Sequelize.DataTypes);
let order_item = require("./order_item")(sequelize, Sequelize.DataTypes);
let product = require("./product")(sequelize, Sequelize.DataTypes);
let admin = require("./Admin")(sequelize, Sequelize.DataTypes);

// //sql relationship here -------------------------------

// admin and ADMIN COUNTRY

admin.hasOne(admin_country);
admin_country.hasMany(admin);
//admin who created the product
product.belongsTo(admin);

product_category.hasMany(product);
// user and order
user.hasMany(order);

order.hasMany(order_item);
order_item.belongsTo(order);
product.hasMany(order_item);

// //-----------------------------------------------------

// //add to db models
db.models.user = user;
db.models.product = product;
db.models.product_category = product_category;
db.models.order = order;
db.models.order_item = order_item;
db.models.admin_country = admin_country;
db.models.admin = admin;

module.exports = db;
