$(document).ready(() => {
  $('#show-description').on('click', function(event) {
    event.preventDefault();

    if ($("#poll-description").is(":hidden")) {
      return $("#poll-description").slideDown("fast"), $("#show-description").html("Hide description");
    };
    return $("#poll-description").slideUp("fast"), $("#show-description").html("Add a description (optional)");
  });

  $('.fa-clipboard').on('click', function(event) {
    const $msg = $('<span class="clipboard-message alert alert-success">copied to clipboard</span>');

    const link = $('.link-poll').attr('href');
    navigator.clipboard.writeText(link);

    $('.fa-clipboard').parent().append($msg);

    setTimeout(function() {
      $msg.fadeOut(function() {
        $(this).remove();
      });
    }, 1000);

  })
});
