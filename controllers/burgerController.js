const User = require("../models/users");
const Order = require("../models/orders");
const mongoose = require("mongoose");

const INGREDIENTS_PRICES = {
  meat: 8,
  salad: 6,
  cheese: 5,
  bacon: 10,
};

exports.setIngredients = (req, res, next) => {
  res.status(200).json({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });
};

exports.getOrders = (req, res, next) => {
  const userId = req.query.userId;
  console.log(1, userId);
  Order.find({ user: mongoose.Types.ObjectId(userId) })
    .then((orders) => {
      console.log(2, orders);
      res.status(200).json({
        orders: orders,
      });
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

exports.postOrders = (req, res, next) => {
  const userId = req.body.userId;
  const ingredients = req.body.ingredients;
  let price = 0;
  for (const key in ingredients) {
    price += INGREDIENTS_PRICES[key] * ingredients[key];
  }
  User.findOne({ _id: mongoose.Types.ObjectId(userId) })
    .then((user) => {
      const order = new Order({
        ingredients: ingredients,
        price: price,
        user: user._id,
      });
      return order.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Order is Successful...",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
