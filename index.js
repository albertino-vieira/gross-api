// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router/Router");
require("dotenv").config();

function startDB() {
  mongoose.connect(
    "mongodb+srv://albertinotino1:Obbpv7dgMJJt9JNg@cluster0.pexuj.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();
const PORT = 4000;

startDB();
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// Export the Express API
module.exports = app;
