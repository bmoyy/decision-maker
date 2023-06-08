$(function() {
  const allChoices = $('.sortable');

  $(".move-1, .move-2").on("click", function() {
    let firstElement = $('#rank-one').children();
    let secondElement = $('#rank-two').children();

    $('#rank-one').html("");
    $('#rank-two').html("");
    $('#rank-two').append($(firstElement));
    $('#rank-one').append($(secondElement));

  });

  $(".move-3, .move-4").on("click", function() {
    let secondElement = $('#rank-two').children();
    let thirdElement = $('#rank-three').children();

    $('#rank-two').html("");
    $('#rank-three').html("");
    $('#rank-two').append($(thirdElement));
    $('#rank-three').append($(secondElement));
  });

  $(allChoices).sortable({
    items: "div",
    stop: function(event, ui) {
        const array = $(allChoices).sortable("toArray");
        $('#choicesRanked').val(array);
    }
  });
});
