const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());

let eightiesSciFi = [
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
    year: 1987,
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

//title page
app.get("/", (req, res) => {
  res.send("Welcome to the Ultimate 80s sci-fi film app!");
});

//opens documentation page
app.use("/public", express.static("public"));

//Return a list of ALL films
app.get("/films", (req, res) => {
  res.json(eightiesSciFi);
});

//Return information about ONE film
app.get("/films/:title", (req, res) => {
  res.json(
    eightiesSciFi.find(film => {
      return film.title === req.params.title;
    })
  );
});

//Return genre from title of film
app.get("/films/genres/:title", (req, res) => {
  res.send(
    "Successful GET request returning data of genre for film: " +
      req.params.title
  );
});

//Return information about a director
app.get("/films/directors/:name", (req, res) => {
  res.send(
    "Successful GET request returning data about director: " + req.params.name
  );
});

//Allow users to register
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    res.status(201).send(newUser);
  }
});

//Allow users to update their information
app.post("/users/:username", (req, res) => {
  res.send(
    "Successful POST request updating information for user:: " +
      req.params.username
  );
});

//Allow users to ADD a film to their favourites
app.put("/users/:username/:film", (req, res) => {
  res.send(
    "Successful PUT request adding film '" +
      req.params.film +
      "' to user '" +
      req.params.username +
      "'"
  );
});

//Allow users to REMOVE a film from their favourites
app.delete("/users/:username/:film", (req, res) => {
  res.send(
    "Successful DELETE request deleting film '" +
      req.params.film +
      "' from user '" +
      req.params.username +
      "'"
  );
});

//Allow users to deregister
app.delete("/users/:username", (req, res) => {
  res.send("Account deleted for " + req.params.username);
});

//ERROR MESSAGE
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Sorry, something went wrong!");
});

app.listen(8080, () => {
  console.log("Your 80s App is on port 8080");
});
