const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

//connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);
{
  useUnifiedTopology: true;
}

//import routes
const authRoute = require("./routes/auth");

//middlewares
// api/user is a prefix
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("server running"));
