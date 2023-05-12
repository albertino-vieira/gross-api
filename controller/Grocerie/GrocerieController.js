const Grocerie = require("../../db/models/Grocerie");

const getGroceries = (req, res) => {
  Grocerie.find({}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
};

const deleteGroceries = (req, res) => {
  const id = req.params.id;
  Grocerie.deleteOne({ _id: id }, function (err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
};

const createGroceries = async (req, res) => {
  const ele = Object.fromEntries(
    Object.entries(req.body).filter((e) => e[0] != "_id")
  );
  const grocerieToAdd = new Grocerie(ele);

  try {
    const grocerie = await grocerieToAdd.save();
    res.send(grocerie);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteGroceriesBulk = async (req, res) => {
  const { ids } = req.body;
  await Grocerie.deleteMany(
    {
      _id: {
        $in: ids,
      },
    },
    function (err, data) {
      if (err) {
        res.status(500);
      } else {
        res.send(data);
      }
    }
  );
};

module.exports = {
  getGroceries,
  deleteGroceries,
  createGroceries,
  deleteGroceriesBulk,
};
