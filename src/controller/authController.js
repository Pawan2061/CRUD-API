const { findByIdAndUpdate, findByIdAndDelete } = require("../db/auth");
const User = require("../db/auth");
const createtoken = require("../middleware/jwt");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("this user already exists");
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const payload = { email: email, password: password };
    const token = createtoken(payload);

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        email: email,
        password: password,
      }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send("the user is deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  register,
  login,
  getUsers,

  getUserById,
  updateUser,
  deleteUser,
};
