const Grosserie = require("../db/Grosserie");
const grosserie = require("../db/Grosserie");

const getGroceries = (req, res) => {
  grosserie.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const deleteGroceries = (req, res) => {
  const id = req.params.id;
  Grosserie.deleteOne({ _id: id }, function (err, data) {
    if (err) {
      res.status(500).send(error);
    } else {
      res.send(data);
    }
  });
};

const createGroceries = async (req, res) => {
  const gross = new Grosserie(req.body);

  try {
    await gross.save();
    res.send(gross);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getGroceries, deleteGroceries, createGroceries };
