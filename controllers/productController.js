const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");
const productValidation = require("../JoiValidation/product");
const Product = require("../models/product");

module.exports.createProduct = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).send("Something went wrong!");
    const { error } = productValidation(
      _.pick(fields, ["name", "description", "price", "quantity", "category"])
    );
    if (error) return res.status(400).send(error.details[0].message);
    const product = new Product(fields);
    if (files.photo) {
      console.log("File object", files);
      fs.readFile(files.photo.path, (err, data) => {
        if (err) return res.status(400).send("Problem in file data");
        product.photo.data = data;
        product.photo.contentType = files.photo.type;
        product.save((err, docSave) => {
          if (err) return res.status(500).send("Internal server error");
          res.status(200).send({
            message: "Product created successfully",
            data: _.pick(docSave, [
              "name",
              "description",
              "price",
              "quantity",
              "category",
            ]),
          });
        });
      });
    } else {
      return res.status(400).send("Sorry! No image provided");
    }
  });
};
module.exports.getProducts = async (req, res) => {
  const findProducts = await Product.find({})
    .select({
      _id: 1,
      name: 1,
      description: 1,
      category: 1,
      quantity: 1,
    })
    .populate("category", "name");
  return res.status(200).send(findProducts);
};
module.exports.getProductById = async (req, res) => {};
module.exports.updateProductById = async (req, res) => {};
