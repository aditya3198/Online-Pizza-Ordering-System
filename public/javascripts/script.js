// script.js
var cart = [];
$(document).ready(function() {
  /*$('.dropdown').hover(function () {
    $('.dropdown-toggle', this).trigger('click');
  });*/

  $("#accordion").accordion({
    heightStyle: "content",
    active: false,
    collapsible: true
  });

  $("#selectable").selectable();

  $("#dialog-message").dialog({
    modal: true,
    buttons: {
      Ok: function() {
        $(this).dialog("close");
      }
    }
  });
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

addToCart = sku => {
  if (cart.indexOf(sku) == -1) {
    cart.push(sku);
    $("<input>")
      .attr({
        type: "hidden",
        value: sku,
        name: "skus"
      })
      .appendTo("#orderForm");
  } else {
    alert("Item already in cart");
  }
};
