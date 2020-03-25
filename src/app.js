const path = require("path");
const express = require("express");
const forecast = require("./utils/forecast");
const geocode = require("./utils/gecode");
const hbs = require("hbs");
const app = express();

// define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
console.log(publicDirPath);
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath)); // will default to index.html

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Steven Lin"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Steven"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is your help",
    title: "Help",
    name: "Steven"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "You must provide an address!" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          location,
          forecast: forecastData,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Steven",
    errorMessage: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Steven",
    errorMessage: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
