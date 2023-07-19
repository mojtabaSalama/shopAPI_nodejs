const db = require("../../models/index");
const Product = db.models.product;
const Category = db.models.product_category;

const fs = require("fs");
const path = require("path");
require("dotenv").config();
const xssFilter = require("xss-filters");

const product = {
  create: async (req, res) => {
    try {
      let { filename } = req.file;
      let { price, name, productCategoryId, amount } = req.body;

      //check req.body
      if (!(price && name && productCategoryId && amount && filename)) {
        return res.status(400).json({ msg: " please enter all fields" });
      }

      //filter list
      let data = [price, name, productCategoryId, amount, filename];
      //filtered data
      data.map((data) => {
        data = xssFilter.inHTMLData(data);
      });

      //make sure no product is replicated
      let product = await Product.findOne({ where: { name } });
      if (product) return res.status(403).json("The product is already exist");

      // check if file is an image
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!allowedTypes.includes(req.file.mimetype)) {
        fs.unlink(
          path.join(__dirname, `../../public/images/${filename}`),
          (err) => {
            if (err) throw err;
            console.log("deleted type is not image");
          }
        );
        return res.status(400).json("File is not an image");
      }

      // the admin who creates the product
      let admin = req.app.locals.admin;
      //save to database
      const newProduct = await Product.create({
        name,
        ImgLink: filename,
        price,
        productCategoryId,
        amount,
        adminId: admin.id,
      });

      //send to client
      res.json({
        user: {
          id: newProduct.id,
          name: newProduct.name,
          price: newProduct.price,
          Image: newProduct.ImgLink,
          productCategoryId: newProduct.productCategoryId,
          amount: newProduct.amount,
          created_by: newProduct.adminId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateImage: async (req, res) => {
    try {
      let { filename } = req.file;
      let { product_id } = req.body;

      const product = await Product.findOne({ where: { id: product_id } });
      if (!product)
        return res.status(400).json("there is no product with id given");

      // check if file is an image]
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!allowedTypes.includes(req.file.mimetype)) {
        fs.unlink(
          path.join(__dirname, `../../public/images/${filename}`),
          (err) => {
            if (err) throw err;
            console.log("deleted type is not image");
          }
        );
        return res.status(400).json("File is not an image");
      }

      //check request
      if (!product_id) return res.status(400).json("add product id");

      //check if product already has an image
      let filePath = path.join(
        __dirname,
        `../../public/images/${product.ImgLink}`
      );

      if (fs.existsSync(filePath)) {
        //delete from fs system
        fs.unlink(filePath, (err) => {
          if (err) console.log(err);
          console.log("deleted from fs successfully");
        });
        //save the new link
        product.ImgLink = filename;
        await product.save();
        con;
        res.json({ product });
      } else {
        product.ImgLink = filename;
        await product.save();
        res.json({ product });
      }
    } catch (error) {
      if (error) throw error;
    }
  },

  updateProduct: async (req, res) => {
    const { name, price, productCategoryId, id, amount } = req.body;
    // check fields
    if (!(name && price && productCategoryId && id & amount)) {
      return await res.status(400).json("enter all feilds");
    }
    const product = await Product.findOne({ where: { id } });
    if (!product)
      return res.status(400).json("there is no product with id given");

    //update product
    Product.update(req.body, { where: { id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "updated successfully" });
        } else {
          res.send("cant update");
        }
      })
      .catch((err) => {
        res.status(404).send({ message: "error" });
      });
  },
  remove_product: async (req, res) => {
    let { id } = req.body;
    if (!id) {
      return res.status(400).json({ msg: "please enter product id" });
    }
    const product = await Product.findOne({ where: { id } });
    if (!product)
      return res.status(400).json("there is no product with id given");

    data = xssFilter.inHTMLData(id);

    Product.destroy({ where: { id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "deleted successfully" });
        } else {
          res.send("can't delete");
        }
      })
      .catch((err) => {
        res.status(404).send({ message: err });
      });
  },
  add_category: async (req, res) => {
    try {
      let { category } = req.body;

      //check req.body
      if (!category) {
        return res.status(400).json({ msg: "please enter category name" });
      }

      data = xssFilter.inHTMLData(category);

      //make sure no category is replicated
      let checkCategory = await Category.findOne({ where: { category } });
      if (checkCategory)
        return res.status(403).json("category is already exist");

      //save to database
      const newCategory = await Category.create({
        category,
      });

      //send to client
      res.json({
        category: {
          ID: newCategory.id,
          Category: newCategory.category,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  remove_category: async (req, res) => {
    let { id } = req.body;
    if (!id) {
      return res.status(400).json({ msg: "please enter category id" });
    }

    const category = await Category.findOne({ where: { id } });
    if (!category)
      return res.status(400).json("there is no category with id given");
    data = xssFilter.inHTMLData(id);

    Category.destroy({ where: { id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "deleted successfully" });
        } else {
          res.send("can't delete");
        }
      })
      .catch((err) => {
        res.status(404).send({ message: err });
      });
  },
  allProducts: async (req, res) => {
    const products = await Product.findAll();

    res.json({ products });
  },
};
module.exports = product;
