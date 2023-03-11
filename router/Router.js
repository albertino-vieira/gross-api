const express = require("express");
const {
  getGroceries,
  deleteGroceries,
  createGroceries,
} = require("../controller/GrocerieController");
const { createUser, login } = require("../controller/UserContoller");
const router = express.Router();

router.get("/groceries", getGroceries);
router.post("/grocerie", createGroceries);
router.delete("/grocerie/:id", deleteGroceries);
router.post("/user", createUser);
router.post("/login", login);

module.exports = router;
