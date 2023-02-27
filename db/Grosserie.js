const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let grosserie = new Schema(
  {
    text: {
      type: String,
    },
  },
  { collection: "Expense" }
);

module.exports = mongoose.model("Expense", grosserie);
