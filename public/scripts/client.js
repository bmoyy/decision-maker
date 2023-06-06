$(document).ready(() => {

  // $("#email-submit").on('submit', function(event) {
  //   event.preventDefault();
  //   const message = $("#email-submit").serialize();

  //   $.ajax({
  //     url: '/polls/email',
  //     method: 'POST',
  //     data: message
  //   }).then((res) => {
  //     console.log(res);
  //   });

  // });

  // $("#poll-input").on('submit', function(event) {
  //   event.preventDefault();
  //   const encodedData = $('#poll-input').serialize();

  //   $.ajax({
  //     url: '/polls',
  //     method: 'POST',
  //     data: encodedData
  //   }).then(() => {
  //     console.log(encodedData);
  //   });

  // });

  $('#show-description').on('click', function(event) {
    event.preventDefault();

    if ($("#poll-description").is(":hidden")) {
      return $("#poll-description").slideDown("fast"), $("#show-description").html("Hide description");
    };
    return $("#poll-description").slideUp("fast"), $("#show-description").html("Add a description");
  });

});
