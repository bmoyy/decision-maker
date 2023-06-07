$(function() {
  const allChoices = $('.choices');
  $(allChoices).sortable({
    stop: function(event, ui) {
        const array = $(allChoices).sortable("toArray");
        $('#choicesRanked').val(array);
    }
  });
});
