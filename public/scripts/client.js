$(document).ready(() => {
  $('#show-description').on('click', function(event) {
    event.preventDefault();

    if ($("#poll-description").is(":hidden")) {
      return $("#poll-description").slideDown("fast"), $("#show-description").html("Hide description");
    };
    return $("#poll-description").slideUp("fast"), $("#show-description").html("Add a description");
  });

});
