const User = require("../db/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
  const { email, password } = req.body;

  const userAlreadyExists = await User.findOne({
    email,
  });

  if (userAlreadyExists) {
    return res.status(400).json({
      error: "User already exists!",
    });
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const user = new User({ email, password: hashPassword });

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    const passwordIsCorrect = bcrypt.compareSync(password, userExists.password);
    if (passwordIsCorrect) {
      const token = jwt.sign({ id: userExists.id }, `${process.env.SECRET}`, {
        expiresIn: 10000000,
      });
      return res.json({ auth: true, token: token, ...userExists._doc });
    } else {
      return res.status(400).json({
        error: "Error",
      });
    }
  } else {
    return res.status(400).json({
      error: "Email or password incorrect",
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: id }, function (err, data) {
    if (err) {
      res.status(500).send(error);
    } else {
      res.send(data);
    }
  });
};

module.exports = { createUser, login, deleteUser };
