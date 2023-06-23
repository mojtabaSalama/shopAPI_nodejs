const db = require("../../models/index");
const USER = db.models.user;
const Admin = db.models.admin;
const xssFilter = require("xss-filters");

const fs = require("fs");
const path = require("path");
const product = require("../../models/product");
const Order = db.models.order;
const Product = db.models.product;
require("dotenv").config();
const order = {
  order: async (req, res) => {
    try {
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

      res.json({
        Order: newOrder,
      });
    } catch (error) {
      if (error) throw error;
    }
  },
  cancel_order: async (req, res) => {
    try {
      let { id, status } = req.body;

      let user = req.app.locals.user;

      if (!(status && id)) return res.status(400).json("enter all feilds");

      const order = await Order.findOne({ where: { id } });

      if (order.id != user.id) return res.status(400).json("unautherized user");
      if (status == "cancel") {
        //update User
        let newOrder = await Order.update(status, { where: { id } });
        res.send(`the order is canceled successfully  ${newOrder}`);
      } else {
        return res.status(400).json("did not canceled");
      }

      let product = await Product.findOne({ where: { id: order.productId } });
      product.amount = order.amount + product.amount;
      await product.save();
    } catch (error) {
      if (error) throw error;
    }
  },

  change_status: async (req, res) => {
    try {
      let { id, status } = req.body;

      let admin = req.app.locals.admin;

      if (!(status && id)) return res.status(400).json("enter all feilds");

      const order = await Order.findOne({ where: { id } });

      if (order.id != admin.id)
        return res.status(400).json("unautherized user");
      if (status == "processing")
        res.status(404).send({ message: "wrong status" });
      //update User
      let newOrder = await Order.update(status, { where: { id } });
      res.send(`updated user successfully ${newOrder}`);

      if (status == "canceled") {
        let product = await Product.findOne({ where: { id: order.productId } });
        product.amount = order.amount + product.amount;
        await product.save();
      }
    } catch (err) {
      res.status(404).send({ message: "wrong status" });
    }
  },
};
module.exports = order;
