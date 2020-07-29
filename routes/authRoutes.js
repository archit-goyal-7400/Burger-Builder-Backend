const express = require("express");
const { body } = require("express-validator/check");
const User = require("../models/users");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Enter the correct Email...")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists...");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signUp
);

router.post("/signin", authController.signin);

module.exports = router;
