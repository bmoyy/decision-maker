$(function() {
  $('p').on("mousedown", function() {
    $(this).css("cursor", "grabbing");
  })
  .on("mouseup", function() {
    $(this).css("cursor", "grab");
  });
});
