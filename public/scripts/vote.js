$(function() {
  const allChoices = $('.sortable');

  $(allChoices).sortable({
    items: "div",
    stop: function(event, ui) {
      const array = $(allChoices).sortable("toArray");
      $(rankedChoicesInput).val(array);
    }
  });

  $("#toggle-buttons").on('click', function() {
    $(allChoices).sortable('cancel');
    $(allChoices).sortable('disable');
    $('.drag-instruction').css('display', 'none');
    $('.arrow-instruction').css('display', 'block');
    $('.ranking-buttons').css('display', 'flex');
    $('.choice').css('cursor', 'default');
    $('#toggle-buttons').css('display', 'none');
  })

  const rankedChoicesInput = $('#choicesRanked');

  $(".move-1, .move-2").on("click", function() {
    let firstElement = $('#rank-one').children();
    let secondElement = $('#rank-two').children();
    let thirdElement = $('#rank-three').children();
    $('#rank-one').html("");
    $('#rank-two').html("");
    $('#rank-two').append($(firstElement));
    $('#rank-one').append($(secondElement));
    firstElement = $('#rank-one').children();
    secondElement = $('#rank-two').children();
    thirdElement = $('#rank-three').children();
    $(rankedChoicesInput).val([firstElement[0].id, secondElement[0].id, thirdElement[0].id]);
  });

  $(".move-3, .move-4").on("click", function() {
    let firstElement = $('#rank-one').children();
    let secondElement = $('#rank-two').children();
    let thirdElement = $('#rank-three').children();
    $('#rank-two').html("");
    $('#rank-three').html("");
    $('#rank-two').append($(thirdElement));
    $('#rank-three').append($(secondElement));
    firstElement = $('#rank-one').children();
    secondElement = $('#rank-two').children();
    thirdElement = $('#rank-three').children();
    $(rankedChoicesInput).val([firstElement[0].id, secondElement[0].id, thirdElement[0].id]);
  });

});
