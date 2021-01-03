const express = require("express");
const app = express();

let EightiesSciFi = [
  {
    title: "Bladerunner",
    year: 1982,
    director: "Ridley Scott",
    cast: "Harrison Ford"
  },
  {
    title: "Tron",
    year: 1982,
    director: "Steven Lisberger",
    cast: "Jeff Bridges"
  },
  {
    title: "Robocop",
    year: "1987",
    director: "Paul Verhoeven",
    cast: "Peter Weller"
  },
  {
    title: "The Fly",
    year: 1986,
    director: "David Cronenberg",
    cast: "Jeff Goldblum"
  },
  {
    title: "Aliens",
    year: 1986,
    director: "James Cameron",
    cast: "Sigourney Weaver"
  },
  {
    title: "Flash Gordon",
    year: 1980,
    director: "Mike Hodges",
    cast: "Sam J Jones"
  },
  {
    title: "The Running Man",
    year: 1987,
    director: "Paul Michael Glaser",
    cast: "Arnold Schwarzenegger"
  },
  {
    title: "The Terminatror",
    year: 1984,
    director: "James Cameron",
    cast: "Arnold Schwarzenegger"
  },
  {
    title: "Wierd Science",
    year: 1985,
    director: "John Hughes",
    cast: "Anthony Michael Hall"
  },
  {
    title: "Flight of the Navigator",
    year: 1986,
    director: "Randal Kleiser",
    cast: "Joey Cramer"
  }
];

app.get("/movies", (req, res) => {
  res.json(EightiesSciFi);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Ultimate 80s sci-fi website!");
});

app.use("/documentation.html", express.static("public"));

app.listen(8080, () => {
  console.log("Your 80s App is on port 8080");
});
