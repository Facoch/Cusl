/*
  DRY, cos'è DRY?
*/

var ip = ["0","127.0.0.1","127.0.0.1"];

function caricaPagina(){
  aggiornaContatori();
  var salvato1=localStorage['BN1'];
  var salvato2=localStorage['BN2'];
  if(salvato1!=null){
    document.getElementById('contatoreSalvato1').innerHTML = salvato1;
    document.getElementById('scontrino1').disabled = false;
  }
  if(salvato2!=null){
    document.getElementById('contatoreSalvato2').innerHTML = salvato2;
    document.getElementById('scontrino2').disabled = false;
  }
  aggiornaStoria();
}

function aggiornaStoria(){
  var storia1=localStorage["storiaBN1"];
  var storia2=localStorage["storiaBN2"];
  if(storia1!=null){
    var out = " ";
    storia1.split(",").forEach(function(data){
      out= out + data + " - ";
    });
    out = out.slice(0, -3);
    document.getElementById('ultimi1').innerHTML = out;
  }
  if(storia2!=null){
    var out = " ";
    storia2.split(",").forEach(function(data){
      out= out + data + " - ";
    });
    out = out.slice(0, -3);
    document.getElementById('ultimi2').innerHTML = out;
  }
}

function aggiornaContatori(){
  aggiornaContatore(1, scriviContatore);
  aggiornaContatore(2, scriviContatore);
}

function fooCounter(data){
  return Date.now();
}

function aggiornaContatore(id, callback){
  disabilitaAggiorna(id);
  //$.get("http://" + ip[id] + "/web/guest/en/websys/status/getUnificationCounter.cgi", function(data){
  $.get("http://jsonplaceholder.typicode.com/comments?postId=1", function(data){
  //  var counter = getCounter(data);
    var counter = fooCounter(data);
    callback(id, counter);
    abilitaAggiorna(id);
  }).fail(function(xhr,status,err) {
    abilitaAggiorna(id);
    console.log(xhr);
    document.getElementById('erroreAggiornamento').innerHTML=  '<div class="alert alert-danger">' +
    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
    '<strong>Impossibile aggiornare! </strong>'  + status+ ": " + xhr.responseText +
    '\nAvverti Facoch! E prendi il contatore a mano...</div>';
});;
}

function scriviContatore(id, counter){
  document.getElementById('contatore'+ id).innerHTML = counter;
}

function getCounter(data){
  var response = data;
  var patt = new RegExp("Total</td><td nowrap>:</td><td nowrap>[0-9]*",'g');
  var match = response.match(patt);
  return match[0].replace('Total</td><td nowrap>:</td><td nowrap>','');
}

function salvaContatori(id){
  aggiornaContatore(id, salvaCallback);
}

function salvaCallback(id, counter){
  scriviContatore(id, counter);
  var nome = "BN" + id;
  localStorage[nome] = counter;
  document.getElementById('contatoreSalvato'+id).innerHTML = counter;
  document.getElementById('scontrino'+id).disabled = false;
  var nuovo = [counter];
  var vecchio = localStorage["storia"+nome]
  if (vecchio!=null){
    nuovo = nuovo.concat(vecchio.split(",")).slice(0,5);;
  }
  localStorage["storia"+nome]= nuovo;
  aggiornaStoria();
}

function calcolaConto(id){
  aggiornaContatore(id, contoCallback);
}

function contoCallback(id, counter){
  scriviContatore(id, counter);
  var nome = "BN" + id;
  var differenza = counter - localStorage[nome];
  document.getElementById('conto'+id).innerHTML = "<div class='alert alert-success'>" +
"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Dall'ultimo contatore salvato sono state fatte <em>"  + differenza +
  " facciate</em><br/> <strong>Costo: " +
  (differenza*3/100).toFixed(2) + " €.</strong></div>";
}

function disabilitaAggiorna(id){
  document.getElementById('aggiornaFermo'+id).style.display= 'none';
  document.getElementById('aggiornaAnimato'+id).style.display= 'inline-block';
}

function abilitaAggiorna(id){
  document.getElementById('aggiornaAnimato'+id).style.display= 'none';
  document.getElementById('aggiornaFermo'+id).style.display= 'inline-block';
}

$(document).ready(function(){
  // per comportamento a fisarmonica di istruzioni e storia
  $('#istruzioni').on('show.bs.collapse', function () {
    $('#sbaglio').collapse('hide');
  });
  $('#sbaglio').on('show.bs.collapse', function () {
    $('#istruzioni').collapse('hide');
  })
});
