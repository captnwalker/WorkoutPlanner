var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pebbles1",
  database: "exercise_planner_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.html page with the exercises in it.
app.get("/", function(req, res) {
  connection.query("SELECT * FROM exercises;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { exercises: data });
  });
});

// Create a new exercise
app.post("/exercises", function(req, res) {
  connection.query("INSERT INTO exercises (exercise) VALUES (?)", [req.body.exercise], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new exercise
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Retrieve all exercises
app.get("/exercises", function(req, res) {
  connection.query("SELECT * FROM exercises;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});

// Update a exercise
app.put("/exercises/:id", function(req, res) {
  connection.query("UPDATE exercises SET exercise = ? WHERE id = ?", [req.body.exercise, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Delete a exercise
app.delete("/exercises/:id", function(req, res) {
  connection.query("DELETE FROM exercises WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

app.listen(port, function() {
  console.log("listening on port", port);
});
