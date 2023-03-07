const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let grosserie = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantaty: {
      type: Number,
      default: 0,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "Expense" }
);

module.exports = mongoose.model("Expense", grosserie);
