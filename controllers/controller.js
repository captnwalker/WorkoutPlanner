var express = require("express");

var router = express.Router();

// Import the model (exercise.js) to use its database functions.
var exercise = require("../models/exercise.js");

// Get all exercises in exercise database and render on page.
router.get("/", function(req, res) {
  exercise.selectAll(function(data) {
    var hbsObject = {
      exercises: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// Post new exercise to database and refesh page to see it.
router.post("/", function(req, res) {
  exercise.insertOne([
    "exercise_name", "devoured"
  ], [
    req.body.exercise_name, req.body.devoured
  ], function() {
    res.redirect("/");
  });
});

// Mark exercise as devoured in database.
// Refresh page to move it to devoured list.
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  exercise.updateOne({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;