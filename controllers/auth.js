const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = new User({ username, password, role });
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
