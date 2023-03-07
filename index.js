// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Grosserie = require("./db/Grosserie");
const grosserie = require("./db/Grosserie");

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
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.post("/grosserie", async (req, res) => {
  const gross = new Grosserie(req.body);

  try {
    await gross.save();
    res.send(gross);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/grosserie/:id", (req, res) => {
  const id = req.params.id;
  Grosserie.deleteOne({ _id: id }, function (err, data) {
    if (err) {
      res.status(500).send(error);
    } else {
      res.send(data);
    }
  });
});

app.get("/grosseries", (req, res) => {
  grosserie.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Export the Express API
module.exports = app;
