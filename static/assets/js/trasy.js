

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
      $('#sel-zlec-show').text(obj.fields.nazwa + '|' + obj.fields.telefon + '|' + obj.fields.nip + '|' + obj.fields.regon);
      $('#sel-zlec').text(obj.pk);
      deselect($('#zlec-btn'), $('#zlecPopup'));
    });
  });

  $('.wybierz_ladunek').on('click', function () {
    console.log($(this).attr("value"));

    $.get('trasy', { l: $(this).attr("value") }, function(response) {
      var obj = $.parseJSON(response);
      $('#sel-ladunek-show').text(obj.fields.pojazd + '|' + obj.fields.masa + '|' + obj.fields.stan);
      $('#sel-ladunek').text(obj.pk);
      deselect($('#ladunek-btn'), $('#ladunekPopup'));
    });
  });

  $('.wybierz_kierowce').on('click', function () {
    console.log($(this).attr("value"));

    $.get('trasy', { k: $(this).attr("value") }, function(response) {
      var obj = $.parseJSON(response);
      $('#sel-kierowca-show').text(obj.fields.imie + ' ' + obj.fields.nazwisko);
      $('#sel-kierowca').text(obj.pk);
      deselect($('#kierowca-btn'), $('#kierowcaPopup'));
    });
  });

  $('#pocz-add').on('click', function () {
    //console.log($(this).attr("value"));
    var data = $('#pocz-form').serializeArray();
    console.log(data);

    $.post('dodaj_poczatek', data, function (response){
      $('#sel-pocz-show').text(data[1].value);
      $('#sel-pocz').text(response)
      deselect($('#poczatek-btn'), $('#poczatekPopup'));
    });
  });

  $('#dest-add').on('click', function () {
    //console.log($(this).attr("value"));
    var data = $('#dest-form').serializeArray();
    console.log(data);

    $.post('dodaj_destynacje', data, function (response){
      $('#sel-dest-show').text(data[1].value);
      $('#sel-dest').text(response);
      deselect($('#dest-btn'), $('#destPopup'));
    });
  });

  $('#trasa-add-btn').on('click', function(){
    var data = $('#trasa-form').serializeArray();
    console.log(data);
    var request = [];
    //   [data[1].name] : data[1].value
    // };
    //data.forEach((value) => request.push({[value[0].value] : value[1].value}));
    console.log(request);
    $.post('dodaj_trase', data, function() {
      console.log("success");
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