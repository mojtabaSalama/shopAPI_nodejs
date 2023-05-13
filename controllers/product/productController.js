const db = require("../../models/index");
const Product = db.models.product;
const Category = db.models.product_category;

const fs = require("fs");
const path = require("path");
require("dotenv").config();

const product = {
  create: async (req, res) => {
    try {
      let { filename } = req.file;
      let { price, name, productCategoryId } = req.body;

      console.log(req.file);
      //check req.body
      if (!(price && name && filename && productCategoryId)) {
        return res.status(400).json({ msg: " please enter all fields" });
      }

      //filter list
      let data = [price, name, filename, productCategoryId];
      //filtered data
      data.map((data) => {
        data = xssFilter.inHTMLData(data);
      });

      //make sure no admin is replicated
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

      //save to database
      const newProduct = await Product.create({
        name,
        ImgLink: filename,
        price,
        productCategoryId,
      });

      //send to client
      res.json({
        user: {
          id: newProduct.id,
          name: newProduct.name,
          price: newProduct.price,
          filename: newProduct.ImgLink,
          productCategoryId: newProduct.productCategoryId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = product;
