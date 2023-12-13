const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");
const productValidation = require("../JoiValidation/product");
const Product = require("../models/product");

module.exports.createProduct = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
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
  //Query params
  // /api/product?order=desc&sortBy=name&limit=5
  let { order, sortBy, limit } = req.query;
  order = order === "desc" ? -1 : 1;
  sortBy = sortBy ? sortBy : "_id";
  limit = limit ? parseInt(limit) : 10;
  const foundProducts = await Product.find({})
    .select({
      photo: 0,
    })
    .sort({ [sortBy]: order })
    .limit(limit)
    .populate("category", "name");
  return res.status(200).send(foundProducts);
};
module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const foundProduct = await Product.findById(id)
    .select({ photo: 0 })
    .populate("category", "name");
  if (!foundProduct) return res.status(404).send("Product not found!");
  return res.status(200).send(foundProduct);
};
module.exports.getPhoto = async (req, res) => {
  const { id } = req.params;
  const foundPhoto = await Product.findById(id).select({ photo: 1, _id: 0 });
  if (!foundPhoto) return res.status(404).send("No photo found!");
  res.set("Content-Type", foundPhoto.photo.contentType);
  return res.status(200).send(foundPhoto.photo.data);
};
module.exports.updateProductById = async (req, res) => {};
