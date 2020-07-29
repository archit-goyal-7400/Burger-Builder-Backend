const express = require("express");

const router = express.Router();
const burgerController = require("../controllers/burgerController");

router.get("/set_ingredients", burgerController.setIngredients);
router.get("/order", burgerController.getOrders);
router.post("/order", burgerController.postOrders);

module.exports = router;
