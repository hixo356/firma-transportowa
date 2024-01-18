

$(function() {
  //var selected;

  $(document).on('click', '.popup-open-btn', function() {
    let which = $(this).attr('value');
    console.log(which);
    if($(this).hasClass('selected')) {
      deselect($(this));
    } else {
      //selected = $(this);
      $(this).addClass('selected');
      $('#' + which + 'Popup').slideFadeToggle();
    }
    return false;
  });

  $(document).on('click', '.wybierz_zlec',function () {
    console.log($(this).attr("value"));

    $.get('trasy', { z: $(this).attr("value") }, function(response) {
      let obj = JSON.parse(response);
      $('.sel-zlec-show').text(obj.fields.nazwa + '|' + obj.fields.telefon + '|' + obj.fields.nip + '|' + obj.fields.regon);
      $('.sel-zlec').text(obj.pk);
      deselect($('.zlec-btn'), $('#zlecPopup'));
    });
  });

  $(document).on('click', '.wybierz_ladunek',function () {
    console.log($(this).attr("value"));

    $.get('trasy', { l: $(this).attr("value") }, function(response) {
      let obj = $.parseJSON(response);
      $('.sel-ladunek-show').text(obj.fields.pojazd + '|' + obj.fields.masa + '|' + obj.fields.stan);
      $('.sel-ladunek').text(obj.pk);
      deselect($('.ladunek-btn'), $('#ladunekPopup'));
    });
  });

  $(document).on('click', '.wybierz_kierowce', function () {
    console.log($(this).attr("value"));

    $.get('trasy', { k: $(this).attr("value") }, function(response) {
      let obj = $.parseJSON(response);
      $('.sel-kierowca-show').text(obj.fields.imie + ' ' + obj.fields.nazwisko);
      $('.sel-kierowca').text(obj.pk);
      deselect($('.kierowca-btn'), $('#kierowcaPopup'));
    });
  });



  $('#pocz-add').on('click', function () {
    //console.log($(this).attr("value"));
    let data = $('#pocz-form').serializeArray();
    console.log(data);

    $.post('dodaj_poczatek', data, function (response){
      $('.sel-pocz-show').text(data[1].value);
      $('.sel-pocz').text(response)
      deselect($('.poczatek-btn'), $('#poczatekPopup'));
    });
  });

  $('#dest-add').on('click', function () {
    //console.log($(this).attr("value"));
    let data = $('#dest-form').serializeArray();
    console.log(data);

    $.post('dodaj_destynacje', data, function (response){
      $('.sel-dest-show').text(data[1].value);
      $('.sel-dest').text(response);
      deselect($('.dest-btn'), $('#destPopup'));
    });
  });

  //DODANIE TRASY
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
          '                <div class="objects-list-item-content trasy-lista"><div class="olic-child">' + response.data + '</div><div class="olic-child">' + response.zleceniodawca + '</div><div class="olic-child">' + response.ladunek + '</div><div class="olic-child">' + response.poczatek + '</div><div class="olic-child">' + response.destynacja + '</div><div class="olic-child">' + response.kierowca + '</div><div class="olic-child">' + response.przychod + '</div></div>\n' +
          '                <div class="text-center"><button type="button" class="usun_trase" name="usun_trase" value=' + response.pk + '>Usuń</button></div>\n' + //<button type="button" class="edytuj_trase" name="edytuj_trase" value='+response.pk+' style="width: 1.5em; height: 1.5em;">E</button>
          '            </div>');
      console.log("success");
    });
  });

  //RENDEROWANIE TRAS
  let trasyContainer = $('#trasy').find('.objects-list-inside')
  $.getJSON('trasy_all', function(response){
    console.log(response);
    //var obj = $.parseJSON(response);
    $.each(response, function (index, trasa) {
      trasyContainer.append('<div class="trasa-item objects-list-item">\n' +
          '                <div class="objects-list-item-content trasy-lista"><div class="olic-child">' + trasa.data + '</div><div class="olic-child">' + trasa.zleceniodawca + '</div><div class="olic-child">' + trasa.ladunek + '</div><div class="olic-child">' + trasa.poczatek + '</div><div class="olic-child">' + trasa.destynacja + '</div><div class="olic-child">' + trasa.kierowca + '</div><div class="olic-child">' + trasa.przychod + '</div></div>\n' +
          '                <div class="text-center"><button type="button" class="usun_trase" name="usun_trase" value=' + trasa.pk + '>Usuń</button></div>\n' + //<button type="button" class="edytuj_trase" name="edytuj_trase" value='+trasa.pk+' style="width: 1.5em; height: 1.5em;">E</button>
          '            </div>');
    });
  });

  //USUWANIE TRASY
  $(document).on('click', '.usun_trase', function () {
    let btn = $(this);
    $.get('usun_trase', { t: btn.attr("value") }, function() {
      console.log(btn);
      btn.closest('.trasa-item').fadeOut(200, function (){ $(this).remove(); });
      console.log("removed trasa");
    });
  });

  //EDYCJA TRASY
  $(document).on('click', '.edytuj_trase', function() {
    let btn = $(this);
    $.get('get_trasa', { t: btn.attr("value") }, function(response){
      btn.closest('.trasa-item').replaceWith('<div class="trasa-item objects-list-item">' +
            '<form class="edycja-trasy objects-list-item-content">' +
                '<div>' +
                    '<input type="text" value='+response.data+' name="data"/>' +
                '</div>' +
                '<div>' +
                    '<p class="sel-zlec-show">'+response.zleceniodawca+'</p>' +
                    '<textarea style="display: none;" name="zleceniodawca" class="sel-zlec textarea-selected-object"></textarea>' +
                    '<button type="button" class="zlec-btn zlec popup-open-btn" value="zlec">W</button>' +
                '</div>' +
                '<div>' +
                    '<p class="sel-ladunek-show" >'+response.ladunek+'</p>' +
                    '<textarea style="display: none;" name="ladunek" class="sel-ladunek textarea-selected-object"></textarea>' +
                    '<button type="button" class="ladunek-btn ladunek popup-open-btn" value="ladunek">W</button>' +
                '</div>' +
                '<div>' +
                    '<p class="sel-pocz-show" >'+response.poczatek+'</p>' +
                    '<textarea style="display: none;" name="poczatek" class="sel-pocz textarea-selected-object"></textarea>' +
                    '<button type="button" class="poczatek-btn poczatek popup-open-btn" value="poczatek">W</button>' +
                '</div>' +
                '<div>' +
                    '<p class="sel-dest-show" >'+response.destynacja+'</p>' +
                    '<textarea style="display: none;" name="destynacja" class="sel-dest textarea-selected-object"></textarea>' +
                    '<button type="button" class="dest-btn destynacja popup-open-btn" value="dest">W</button>' +
                '</div>' +
                '<div>' +
                    '<p class="sel-kierowca-show" >'+response.kierowca+'</p>' +
                    '<textarea style="display: none;" name="kierowca" class="sel-kierowca textarea-selected-object"></textarea>' +
                    '<button type="button" class="kierowca-btn kierowca popup-open-btn" value="kierowca">W</button>' +
                '</div>' +
                '<div>' +
                    '<input type="text" value='+response.przychod+' name="przychod"/>' +
                '</div>' +
            '</form>' +
            '<div><button type="button" class="potwierdz_trase" name="potwierdz_trase" value='+response.pk+' style="width: 1.5em; height: 1.5em;">P</button></div>' +
        '</div>');
    });


  });

  $(document).on('click', '.potwierdz_trase', function() {
    let btn = $(this);
    let edited = btn.parent().parent().find('.edycja-trasy').serializeArray();
    console.log(edited); //$(document).find('.edycja-trasy')

    $.post('edytuj_trase', { t: $(this).attr("value"), data: edited }, function(response){
      console.log("edycja?");
    });
  });

  $('.popup-close-btn').on('click', function() {
    let which = $(this).attr('value');
    deselect($('.'+which+'-btn'), $('#'+which+'Popup'));
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