const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userFieldNotSelect } = require("../config/notSelection");
require("dotenv").config();

const getUserData = async (user_id) => {
  const userData = await User.findById(user_id, userFieldNotSelect);
  return userData;
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user){
      return res.status(401).json({ msg: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match){
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    await User.findByIdAndUpdate(user.id, {token});
    const userData = await getUserData(user.id);
    return res.json({ token, body: userData, sts: true });
  } catch (err) {
    res.json({ sts: false, msg: `Login unsuccessful cause error : ${err}` });
  }
};

const restoreLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const { user_id, exp } = jwt.verify(token, process.env.SECRET_KEY);
    const tokenStore = await User.findOne({_id: user_id, token});
    if (Date.now() > exp * 1000 || !tokenStore ) {
      return res.json({ sts: false, msg: "Your token expired or this token not current" });
    }
    const userData = await getUserData(user_id);
    res.json({ sts: true, msg: "Restore login successful!", body: userData, token });
  } catch (err) {
    res.json({ sts: false, msg: `Login unsuccessful cause error : ${err}` });
  }
};

module.exports = {
  Login,
  restoreLogin,
};

