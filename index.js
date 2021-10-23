const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "hbs");

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
