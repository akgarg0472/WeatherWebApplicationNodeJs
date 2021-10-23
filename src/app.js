const express = require("express");
const path = require("path");
const hbs = require("hbs");
const axios = require("axios");
const port = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.post("/weather", (req, res) => {
  const city = req?.body?.city;

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64e85fa29c44be949ae99c5d2d07d1c2`;

  const fetchData = async () => {
    const data = await axios
      .get(api)
      .then((res) => res.data)
      .catch((err) => {
        res.send({
          status: `${500}`,
          message: `${"Error fetching data"}`,
        });
        return;
      });

    const temperature = new Number(parseFloat(data?.main?.temp) - 273).toFixed(
      2
    );
    const weatherType = data?.weather[0]?.main;

    res.send({
      status: `${200}`,
      city: `${city}`,
      temperature: `${temperature}`,
      weatherType: `${weatherType}`,
    });
  };

  fetchData();
});

app.get("*", (req, res) => {
  res.render("404error", {
    url: req.params[0],
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
