const express = require("express");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.json());

app.use("/", () => {
  console.log("abc");
});

app.listen(3002, () => {
  console.log("lis");
});
