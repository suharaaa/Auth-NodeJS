const router = require("express").Router();
const User = require("../model/user");
const { registerValidation } = require("../validation");
// const Joi = require("@hapi/joi");

// const schema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required()
//   });

router.post("/register", async (req, res) => {
  //validate and then print the error
//   const validation = schema.validate(req.body);
//   res.send(validation);
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;

// print this
//   res.send("Register");
