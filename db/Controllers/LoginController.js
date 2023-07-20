const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User');

const LoginController = {
  async signin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ Error: true, msg: "Please enter email and password" });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
          console.log('user', user)
        return res.status(404).json({ Error: true, msg: "User not found" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ Error: true, msg: "Invalid credentials" });
      }

      if (!user.verify) {
        return res.status(401).json({ Error: true, msg: "User not verified. Please verify your email first." });
      }

      const token = jwt.sign(
        { email: user.email, id: user._id },
        "your_secret_key"
      );

      return res.status(200).json({
        user,
        token,
        msg: "User signed in successfully",
      });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },
};

module.exports = LoginController;
