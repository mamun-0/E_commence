const { Schema, model } = require("mongoose");
const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: Number,
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema)