const User = require("../db/auth");
const createtoken = require("../middleware/jwt");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send("All fields are mandatory");
    }
    const user  = await User.findOne({ email });
    if (user) {
      return res.send("this user already exists");
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();
  } catch (error) {
    res.send(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login( email, password );
    const payload = { email: email, password: password };
    const token = createtoken(payload);

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
