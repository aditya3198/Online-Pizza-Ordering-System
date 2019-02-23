// script.js

$(document).ready(function () {

  $('.dropdown').hover(function () {
    $('.dropdown-toggle', this).trigger('click');
  });

  $('#accordion').accordion({
    heightStyle: "content",
    active: false,
    collapsible: true
  });

});









