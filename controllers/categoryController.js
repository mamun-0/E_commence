const _ = require("lodash");
const categoryValidation = require("../JoiValidation/category");
const Category = require("../models/category");
module.exports.createCategory = async (req, res) => {
  const { error } = categoryValidation(_.pick(req.body, ["name"]));
  if (error) return res.status(400).send(error.details[0].message);
  const newCategory = new Category(_.pick(req.body, ["name"]));
  await newCategory.save();
  res.status(200).send({
    message: "Category created successfully",
    data: {
      name: newCategory.name,
    },
  });
};
module.exports.getCategories = async (req, res) => {
  const allCategory = await Category.find({})
    .select({ _id: 1, name: 1 })
    .sort({ name: 1 });
  return res.status(200).send(allCategory);
};
