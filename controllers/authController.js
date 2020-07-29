const User = require("../models/users");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  // console.log("dbhjbfshbhbfhbhfsbh");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("jndjkfnjdnhfbdafbadbfhabhjdfnbfabhj", errors.array()[0].msg);
    const error = new Error("Validation Failed...");
    error.statusCode = 422;
    error.message = errors.array()[0].msg;
    // console.log(errors.array());
    throw error;
  }

  // console.log("1");

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      // console.log(".........");
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "User created successfully...",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error("E-mail does not exist...");
        err.statusCode = 401;
        throw err;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const err = new Error("Wrong Password");
        err.statusCode = 401;
        throw err;
      }
      const token = jwt.sign(
        { userId: loadedUser._id.toString(), email: loadedUser.email },
        "mysecretsecretnjknwjkfdn",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      // console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
