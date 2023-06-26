const db = require("../../models/index");
const USER = db.models.user;
const Admin = db.models.admin;
const xssFilter = require("xss-filters");

const fs = require("fs");
const path = require("path");
const product = require("../../models/product");
const Order = db.models.order;
const Item = db.models.order_item;
const Product = db.models.product;
require("dotenv").config();
const order = {
  // where the user can order products
  order: async (req, res) => {
    try {
      let { items } = req.body;
      // check that its not empty
      if (items.length == 0)
        return res.status(400).json({ msg: " please enter a product" });
      // total price is the sum of all Items prices
      let totalprice = 0;

      // ensure the order is from the loged in user
      let user = req.app.locals.user;

      // create order in database
      const newOrder = await Order.create({
        price: totalprice,

        userId: user.id,
        status: "processing",
      });
      items.forEach(async (item) => {
        // check info
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

        // set total price of the item
        let price = amount * product.price;

        const newItem = await Item.create({
          productId: product_id,
          price,

          amount,
          orderId: newOrder.id,
        });

        // withdraw the item ordered
        product.amount = product.amount - amount;
        await product.save();
        // set the price of all the order items
        totalprice = +newItem.price;
        newOrder.price = totalprice;
        await newOrder.save();
      });
    } catch (error) {
      if (error) throw error;
    }
  },

  cancel_order: async (req, res) => {
    try {
      let { id, status } = req.body;

      console.log(status);

      // check fields
      if (!(status && id)) return res.status(400).json("enter all feilds");

      //check if the user who made the order is the one who makes the changes
      let user = req.app.locals.user;
      let order = await Order.findOne({ where: { id } });
      if (order.userId != user.id) {
        return res.status(400).json(" user");
      }

      // canceling the order
      if (status == "canceled") {
        order.status = status;
        await order.save();

        res.send(`the order is canceled successfully  `);
      } else {
        return res.status(400).json("did not canceled");
      }
      // withdraw the ordered pruducts after canceling
      items = await Item.findAll({ where: { orderId: order.id } });

      items.forEach(async (item) => {
        let product = await Product.findOne({ where: { id: item.productId } });
        product.amount = item.amount + product.amount;
        await product.save();
      });
    } catch (error) {
      if (error) throw error;
    }
  },

  change_status: async (req, res) => {
    try {
      let { id, status } = req.body;

      // check fields
      if (!(status && id)) return res.status(400).json("enter all feilds");

      //check if the status is one of the stauses in the model
      // also because the status is changed from proccessing it can not be proccessing
      // the status in the input can not be the same as the status in the database
      const order = await Order.findOne({ where: { id } });
      if (
        status == "processing" &&
        (status != "canceled" || status != "delivered") &&
        status == order.status
      ) {
        return res.status(404).send({ message: "wrong status" });
      }
      if (order.status == "processing") {
        //update status in database
        order.status = status;
        await order.save();
        // role back the products ordered after canceling
        if (status == "canceled") {
          items = await Item.findAll({ where: { orderId: order.id } });

          items.forEach(async (item) => {
            let product = await Product.findOne({
              where: { id: item.productId },
            });
            product.amount = item.amount + product.amount;
            await product.save();
          });
        }
        return res
          .status(200)
          .send({ message: "status is updated successfully" });
      } else {
        return res
          .status(404)
          .send({ message: "you can not change the status" });
      }
    } catch (err) {
      throw err;
    }
  },
};
module.exports = order;
