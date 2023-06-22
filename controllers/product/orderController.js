const db = require("../../models/index");
const USER = db.models.user;
const Admin = db.models.admin;
const xssFilter = require("xss-filters");

const fs = require("fs");
const path = require("path");
const Order = require("../../models/order");
require("dotenv").config();
const order = {
  order: async (req, res) => {
    let { product_id, amount } = req.body;
    if (amount == 0) {
      return res.status(400).json({ msg: " amount must not be 0" });
    }
    if (!(product_id && amount)) {
      return res.status(400).json({ msg: " please enter all fields" });
    }
    let product = await Product.findOne({ where: { id: product_id } });
    if (!product) {
      return res.status(400).json("wrong id");
    }
    if (amount > product.amount) {
      return res.status(400).json("the amount is more than available");
    }

    let price = amount * product.price;

    const newOrder = await Order.create({
      productId: product_id,
      price,
      status: "processing",
      amount,
    });
    product.amount = product.amount - amount;
    await product.save();
  },
};
module.exports = order;
