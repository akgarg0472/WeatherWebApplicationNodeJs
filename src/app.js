const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const hbs = require("hbs");
const app = express();

// serving static content (css and JS)
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

// setting up view engine
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("404error", {
    url: req.params[0],
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
