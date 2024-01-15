

$(function() {
  //var selected;

  $('.popup-open-btn').on('click', function() {
    var which = $(this).attr('value');
    if($(this).hasClass('selected')) {
      deselect($(this));
    } else {
      //selected = $(this);
      $(this).addClass('selected');
      $('#' + which + 'Popup').slideFadeToggle();
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

  $('.wybierz_kierowce').on('click', function () {
    console.log($(this).attr("value"));

    $.get('trasy', { k: $(this).attr("value") }, function(response) {
      var obj = $.parseJSON(response);
      $('#sel-kierowca').text(obj.fields.imie + ' ' + obj.fields.nazwisko);
      deselect($('#kierowca-btn'), $('#kierowcaPopup'));
    });
  });

  $('#pocz-add').on('click', function () {
    //console.log($(this).attr("value"));
    var data = $('#pocz-form').serializeArray();
    console.log(data);

    $.post('dodaj_poczatek', data, function (){
      $('#sel-pocz').text(data[1].value);
      deselect($('#poczatek-btn'), $('#poczatekPopup'));
    });
  });

  $('#dest-add').on('click', function () {
    //console.log($(this).attr("value"));
    var data = $('#dest-form').serializeArray();
    console.log(data);

    $.post('dodaj_destynacje', data, function (){
      $('#sel-dest').text(data[1].value);
      deselect($('#dest-btn'), $('#destPopup'));
    });
  });

  $('.popup-close-btn').on('click', function() {
    var which = $(this).attr('value');
    deselect($('#'+which+'-btn'), $('#'+which+'Popup'));
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