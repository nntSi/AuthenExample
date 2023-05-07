const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const exitingUser = await User.findOne({
      $or: [{ email: req.body.email }],
    });
    if (exitingUser) {
      return res.json({ sts: false, msg: "This email is already exits" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.json({ msg: `Create user succesful`, sts: true });
  } catch (err) {
    res.json({ msg: `Error is : ${err}`, sts: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const {_id, date_of_birth, firstname, lastname} = req.body;
    const editUser = await User.findByIdAndUpdate(_id, {date_of_birth, firstname, lastname});
    res.json({ msg: `Update user info successful`, sts: true});
  } catch (err) {
    res.json({ msg: `Error is : ${err}`, sts: false });
  }
};

const updatePassword = async (req, res) => {
  try {
    const {_id, password_old, password_new} = req.body;
    const usr = await User.findOne({_id});
    const match = await bcrypt.compare(password_old, usr.password);
    if (!match){
      return res.json({ msg: "Password current incorrect!", sts: false });
    }
    const match_two = await bcrypt.compare(password_old, password_new);
    if (!match_two){
      return res.json({ msg: "Password must not be the same", sts: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password_new, salt);
    await User.findByIdAndUpdate(_id, {password: hashedPassword});
    res.json({msg: `Update Password Successful`, sts: true});
  } catch (err) {
    res.json({ msg: `Error is : ${err}`, sts: false });
  }
}

module.exports = {
  createUser,
  updateUser,
  updatePassword
}