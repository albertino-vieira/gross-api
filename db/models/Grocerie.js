const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let grocerie = new Schema(
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
    listId: {
      type: String,
      default: "",
    },
    createdBy: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      default: mongoose.now(),
    },
  },
  { collection: "Expense" }
);

module.exports = mongoose.model("Expense", grocerie);
