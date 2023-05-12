const express = require("express");
const {
  getGroceries,
  deleteGroceries,
  createGroceries,
  deleteGroceriesBulk,
} = require("../controller/Grocerie/GrocerieController");
const {
  createUser,
  login,
  deleteUser,
} = require("../controller/User/UserContoller");
const router = express.Router();

router.get("/groceries", getGroceries);
router.post("/grocerie", createGroceries);
router.delete("/grocerie/:id", deleteGroceries);
router.delete("/groceries", deleteGroceriesBulk);
router.post("/user", createUser);
router.post("/login", login);
router.delete("/user/:id", deleteUser);

module.exports = router;
