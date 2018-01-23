
  $(".delexercise").on("click", function(event) {
    var id = $(this).data("exerciseid");

    // Send the DELETE request.
    $.ajax("/exercises/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#addexercise").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newexercise = {
      exercise: $("#addexercise [name=exercise]").val().trim()
    };

    // Send the POST request.
    $.ajax("/exercises", {
      type: "POST",
      data: newexercise
    }).then(
      function() {
        console.log("added new exercise");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#updateexercise").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var id = $("[name=id]").val().trim();

    var updatedexercise = {
      exercise: $("#updateexercise [name=exercise]").val().trim()
    };

    // Send the PUT request.
    $.ajax("/exercises/" + id, {
      type: "PUT",
      data: updatedexercise
    }).then(
      function() {
        console.log("updated id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
