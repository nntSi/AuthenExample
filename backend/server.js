const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/hi", (req, res) => {
  res.json({ message: "Hello world32" });
});

app.use("/sati", require("./api"));

app.listen(3002, () => {
  console.log("this application running in port 3002");
});
