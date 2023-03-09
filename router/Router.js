const express = require("express");
const {
  getGroceries,
  deleteGroceries,
  createGroceries,
} = require("../controller/GrocerieController");
const router = express.Router();

router.get("/grosseries", getGroceries);
router.post("/grosserie", createGroceries);
router.delete("/grosserie/:id", deleteGroceries);

module.exports = router;
