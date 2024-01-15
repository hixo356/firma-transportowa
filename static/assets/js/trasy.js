

$(function() {
  //var selected;

  $('#zlec-btn').on('click', function() {
    if($(this).hasClass('selected')) {
      deselect($(this));
    } else {
      //selected = $(this);
      $(this).addClass('selected');
      $('#zlecPopup').slideFadeToggle();
    }
    return false;
  });

  $('#ladunek-btn').on('click', function() {
    if($(this).hasClass('selected')) {
      deselect($(this));
    } else {
      //selected = $(this);
      $(this).addClass('selected');
      $('#ladunekPopup').slideFadeToggle();
    }
    return false;
  });

  $('.wybierz_zlec').on('click', function () {
    console.log($(this).attr("value"));

    $.get('trasy', { z: $(this).attr("value") }, function(response) {
      var obj = JSON.parse(response);
      $('#sel-zlec').text(obj.fields.nazwa + '|' + obj.fields.telefon + '|' + obj.fields.nip + '|' + obj.fields.regon);
      deselect($('#zlec-btn'), $('#zlecPopup'));
    });
  });

  $('.wybierz_ladunek').on('click', function () {
    console.log($(this).attr("value"));

    $.get('trasy', { l: $(this).attr("value") }, function(response) {
      var obj = $.parseJSON(response);
      $('#sel-ladunek').text(obj.fields.pojazd + '|' + obj.fields.masa + '|' + obj.fields.stan);
      deselect($('#ladunek-btn'), $('#ladunekPopup'));
    });
  });

  $('.zlec-popup-close').on('click', function() {
    deselect($('#zlec-btn'), $('#zlecPopup'));
    return false;
  });

  $('.lad-popup-close').on('click', function() {
    deselect($('#ladunek-btn'), $('#ladunekPopup'));
    return false;
  });
});

$.fn.slideFadeToggle = function(easing, callback) {
  return this.animate({ opacity: 'toggle' }, 'fast', easing, callback);
};

function deselect(e, p) {
  p.slideFadeToggle(function() {
    e.removeClass('selected');
  });
  console.log("deselected")
}