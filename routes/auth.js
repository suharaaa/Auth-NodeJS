const router = require("express").Router();

router.post("/register", (req, res) => {
    //print this
  res.send("Register");
});

// router.post('/login')

module.exports = router;
