const express = require("express");
const mongoose = require("mongoose");
const mongokey = require("./config/keys");

const app = express();

const burgerRoutes = require("./routes/burgerRoutes");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(bodyParser.json());
app.use("/", burgerRoutes);
app.use("/", authRoutes);
app.use((err, req, res, next) => {
  console.log(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  err.data = err.message;
  res.status(err.statusCode).json({ error: err });
});

mongoose
  .connect(mongokey)
  .then((res) => {
    console.log("connected!");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
