const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  ingredients: {
    type: Object,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
