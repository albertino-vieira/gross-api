const express = require("express");
const {
  getGroceries,
  deleteGroceries,
  createGroceries,
} = require("../controller/GrocerieController");
const router = express.Router();

router.get("/groceries", getGroceries);
router.post("/grocerie", createGroceries);
router.delete("/grocerie/:id", deleteGroceries);

module.exports = router;
