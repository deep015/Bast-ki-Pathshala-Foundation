const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin || !(await bcrypt.compare(password, admin.password)))
    return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.status(200).json({ token });
};

module.exports = { adminLogin };
