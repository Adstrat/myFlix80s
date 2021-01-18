const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),
  Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());

//default text responce
app.get("/", (req, res) => {
  res.send("Welcome to the Ultimate 80s sci-fi movie app!");
});

//opens documentation page
app.use("/public", express.static("public"));

//ALL movies - get *
app.get("/movies", (req, res) => {
  Movies.find()
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//ONE movie - get by title *
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(movie => {
      res.status(201).json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Return genre from title of film
app.get("/movies/genres/:Title", (req, res) => {
  res.send(
    "Successful GET request returning data of genre for movies: " +
      req.params.title
  );
});

//Return information about a director
app.get("/movies/directors/:name", (req, res) => {
  res.send(
    "Successful GET request returning data about director: " + req.params.name
  );
});

//Users register * ?
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//All users - get *
app.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//One User - get by username *
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// User update, by username * ?
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// User add movie to favourites *
app.post("/users/:Username/Movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavouriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//User REMOVE movie from favourites
app.delete("/users/:username/:movie", (req, res) => {
  res.send(
    "Successful DELETE request deleting movie '" +
      req.params.film +
      "' from user '" +
      req.params.username +
      "'"
  );
});

//User deleted - by username *
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//ERROR MESSAGE
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Sorry, something went wrong!");
});

app.listen(8080, () => {
  console.log("Your 80s App is on port 8080");
});
