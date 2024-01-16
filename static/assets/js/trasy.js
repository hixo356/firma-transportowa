

$(function() {
  //var selected;

  $('.popup-open-btn').on('click', function() {
    let which = $(this).attr('value');
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
      let obj = JSON.parse(response);
      $('#sel-zlec-show').text(obj.fields.nazwa + '|' + obj.fields.telefon + '|' + obj.fields.nip + '|' + obj.fields.regon);
      $('#sel-zlec').text(obj.pk);
      deselect($('#zlec-btn'), $('#zlecPopup'));
    });
  });

  $('.wybierz_ladunek').on('click', function () {
    console.log($(this).attr("value"));

    $.get('trasy', { l: $(this).attr("value") }, function(response) {
      let obj = $.parseJSON(response);
      $('#sel-ladunek-show').text(obj.fields.pojazd + '|' + obj.fields.masa + '|' + obj.fields.stan);
      $('#sel-ladunek').text(obj.pk);
      deselect($('#ladunek-btn'), $('#ladunekPopup'));
    });
  });

  $('.wybierz_kierowce').on('click', function () {
    console.log($(this).attr("value"));

    $.get('trasy', { k: $(this).attr("value") }, function(response) {
      let obj = $.parseJSON(response);
      $('#sel-kierowca-show').text(obj.fields.imie + ' ' + obj.fields.nazwisko);
      $('#sel-kierowca').text(obj.pk);
      deselect($('#kierowca-btn'), $('#kierowcaPopup'));
    });
  });



  $('#pocz-add').on('click', function () {
    //console.log($(this).attr("value"));
    let data = $('#pocz-form').serializeArray();
    console.log(data);

    $.post('dodaj_poczatek', data, function (response){
      $('#sel-pocz-show').text(data[1].value);
      $('#sel-pocz').text(response)
      deselect($('#poczatek-btn'), $('#poczatekPopup'));
    });
  });

  $('#dest-add').on('click', function () {
    //console.log($(this).attr("value"));
    let data = $('#dest-form').serializeArray();
    console.log(data);

    $.post('dodaj_destynacje', data, function (response){
      $('#sel-dest-show').text(data[1].value);
      $('#sel-dest').text(response);
      deselect($('#dest-btn'), $('#destPopup'));
    });
  });

  $('#trasa-add-btn').on('click', function(){
    let data = $('#trasa-form').serializeArray();
    console.log(data);
    let request = [];
    //   [data[1].name] : data[1].value
    // };
    //data.forEach((value) => request.push({[value[0].value] : value[1].value}));
    console.log(request);
    $.post('dodaj_trase', data, function(response) {
      console.log(response)
      $('#trasy').find('.objects-list-inside').append('<div class="trasa-item objects-list-item">\n' +
          '                <div class="objects-list-item-content"><div class="olic-child">'+response.data+'</div><div class="olic-child">'+response.zleceniodawca+'</div><div class="olic-child">'+response.ladunek+'</div><div class="olic-child">'+response.poczatek+'</div><div class="olic-child">'+response.destynacja+'</div><div class="olic-child">'+response.kierowca+'</div></div>\n' +
          '                <div><button type="button" class="usun_trase" name="usun_trase" value='+response.pk+' style="width: 1.5em; height: 1.5em;">U</button></div>\n' +
          '            </div>');
      console.log("success");
    });
  });

  let trasyContainer = $('#trasy').find('.objects-list-inside')
  $.getJSON('trasy_all', function(response){
    console.log(response);
    //var obj = $.parseJSON(response);
    $.each(response, function (index, trasa) {
      trasyContainer.append('<div class="trasa-item objects-list-item">\n' +
        '                <div class="objects-list-item-content"><div class="olic-child">'+trasa.data+'</div><div class="olic-child">'+trasa.zleceniodawca+'</div><div class="olic-child">'+trasa.ladunek+'</div><div class="olic-child">'+trasa.poczatek+'</div><div class="olic-child">'+trasa.destynacja+'</div><div class="olic-child">'+trasa.kierowca+'</div></div>\n' +
        '                <div><button type="button" class="usun_trase" name="usun_trase" value='+trasa.pk+' style="width: 1.5em; height: 1.5em;">U</button></div>\n' +
        '            </div>');
    });
  });

  $(document).on('click', '.usun_trase', function () {
    let btn = $(this);
    $.get('usun_trase', { t: btn.attr("value") }, function() {
      console.log(btn);
      btn.closest('.trasa-item').fadeOut(200, function (){ $(this).remove(); });
      console.log("removed trasa");
    });
  });

  $(document).on('click', '.edytuj_trase', function() {
    let btn = $(this);
    $.get('get_trasa', { t: btn.attr("value") }, function(reponse){
      btn.closest('.trasa-item').updateWith('<div class="trasa-item objects-list-item">' +
            '<form class="edycja-trasy objects-list-item-content"><input type="text" value='+response.data+' name="data"/><input type="text" value='+response.zleceniodawca+' name="data"/><input type="text" value='+response.ladunek+' name="data"/><input type="text" value='+response.poczatek+' name="data"/><input type="text" value='+response.destynacja+' name="data"/><input type="text" value='+response.przychod+' name="data"/></form>' +
            '<div><form action="trasy" method="post" style="display: flex; justify-content: space-around;">{% csrf_token %}<button type="button" class="potwierdz_trase" name="potwierdz_trase" value='+response.pk+' style="width: 1.5em; height: 1.5em;">P</button></form></div>' +
        '</div>');
    });

    let edited = btn.closest('.edycja-trasy').serializeArray();
    console.log(`edited; ${data}`);

    $.post('edytuj_trase', { t: btn.attr("value"), data: data }, function(response){

    });
  });

  $('.popup-close-btn').on('click', function() {
    let which = $(this).attr('value');
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