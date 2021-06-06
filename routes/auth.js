const router = require("express").Router();
const User = require("../model/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  //validate and then print the error
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check user is already in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //hash password
  //genSlt(10) = complexity of the string thats gonna generate
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    //get only user id
    res.send({ user: user._id });
  } catch (err) {
    res.status(404).send(err);
  }
});

//login
router.post("/login", async (req, res) => {
  //validate and then print the error
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check user is already in db
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is incorrect");

  res.send("logged in")
});

module.exports = router;

// print this
//   res.send("Register");
