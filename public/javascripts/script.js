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

  $('#selectable').selectable();
});

function check() {
  if (
    document.getElementById("password").value ==
    document.getElementById("confirm_password").value
  ) {
    document.getElementById("message").style.color = "green";
    document.getElementById("message").innerHTML = "matching";
  } else {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "not matching";
  }
}

