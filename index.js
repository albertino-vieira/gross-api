// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router/Router");
require("dotenv").config();
const { Server } = require("socket.io");
require("dotenv").config();

function startDB() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();
const PORT = 4000;
//const io = new Server(app);
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
