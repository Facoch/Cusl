/*
  DRY, cos'è DRY?
*/

var ip = "127.0.0.1";

function caricaPagina(){
  aggiornaContatori(scriviContatore);
  var salvato1=localStorage['BMColore'];
  var salvato2=localStorage['BMBN'];
  if(salvato1!=null){
    document.getElementById('contatoreSalvato1').innerHTML = salvato1;
    document.getElementById('scontrino1').disabled = false;
  }
  if(salvato2!=null){
    document.getElementById('contatoreSalvato2').innerHTML = salvato2;
  }
  aggiornaStoria();
}

function aggiornaStoria(){
  var storia1=localStorage["storiaBMColore"];
  var storia2=localStorage["storiaBMBN"];
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

function aggiornaContatori(callback){

  disabilitaAggiorna();
  //$.get("http://" + ip + "/web/guest/en/websys/status/getUnificationCounter.cgi", function(data){
  $.get("http://jsonplaceholder.typicode.com/comments?postId=1", function(data){
  //  var counter = getCounter(data);
  var COLcounter = fooColorCounter(data);
  var BNcounter = fooBNCounter(data);
  callback(COLcounter, BNcounter);
  abilitaAggiorna();
  }).fail(function(xhr,status,err) {
    abilitaAggiorna();
    console.log(xhr);
    document.getElementById('erroreAggiornamento').innerHTML=  '<div class="alert alert-danger">' +
    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
    '<strong>Impossibile aggiornare! </strong>'  + status+ ": " + xhr.responseText +
    '\nAvverti Facoch! E prendi il contatore a mano...</div>';
});;
}

function fooColorCounter(data){
  return Date.now();
}
function fooBNCounter(data){
  return Date.now();
}

function scriviContatore(ColCounter, BNCounter){
  document.getElementById('contatore1').innerHTML = ColCounter;
  document.getElementById('contatore2').innerHTML = BNCounter;

}

function getColorCounter(data){
  var response = data;
  var patt = new RegExp("Color</td><td nowrap>:</td><td nowrap>[0-9]*",'g');
  var match = response.match(patt);
  return match[0].replace('Color</td><td nowrap>:</td><td nowrap>','');
}

function getBNCounter(data){
  var response = data;
  var patt = new RegExp("White</td><td nowrap>:</td><td nowrap>[0-9]*",'g');
  var match = response.match(patt);
  return match[0].replace('White</td><td nowrap>:</td><td nowrap>','');
}

function salvaContatori(){
  aggiornaContatori(salvaCallback);
}



function salvaCallback(ColCounter, BNCounter){
  scriviContatore(ColCounter, BNCounter);
  localStorage["BMColore"] = ColCounter;
  localStorage["BMBN"] = BNCounter;
  document.getElementById('contatoreSalvato1').innerHTML = ColCounter;
  document.getElementById('contatoreSalvato2').innerHTML = BNCounter;
  document.getElementById('scontrino1').disabled = false;
  var nuovoCOL = [ColCounter];
  var nuovoBN = [BNCounter];
  var vecchioCOL = localStorage["storiaBMColore"]
  if (vecchioCOL!=null){
    nuovoCOL = nuovoCOL.concat(vecchioCOL.split(",")).slice(0,5);;
  }
  var vecchioBN = localStorage["storiaBMBN"]
  if (vecchioBN!=null){
    nuovoBN = nuovoBN.concat(vecchioBN.split(",")).slice(0,5);;
  }
  localStorage["storiaBMColore"]= nuovoCOL;
  localStorage["storiaBMBN"]= nuovoBN;
  aggiornaStoria();
}

function calcolaConto(){
  aggiornaContatori(contoCallback);
}

function contoCallback(ColCounter, BNCounter){
  scriviContatore(ColCounter, BNCounter);
  var ColDifferenza = ColCounter - localStorage['BMColore'];
  var BNDifferenza = BNCounter - localStorage['BMBN'];
  document.getElementById('conto1').innerHTML = "<div class='alert alert-success'>" +
"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Sono state fatte <em>"  + ColDifferenza +
  " facciate a colori</em> e <em>"  + BNDifferenza +
    " facciate in bianco e nero</em> dall'ultimo contatore salvato, per un costo di <br/><strong>" +
  (ColDifferenza*30/100).toFixed(2) + "€</strong> Colore <br/> <strong>" +
    (BNDifferenza*3/100).toFixed(2) + "€</strong> Bianco e Nero<br/><strong>Totale: "+ ((ColDifferenza*30 + BNDifferenza*3)/100).toFixed(2) + "€</strong></div>";
}

function disabilitaAggiorna(){
  document.getElementById('aggiornaFermo1').style.display= 'none';
  document.getElementById('aggiornaAnimato1').style.display= 'inline-block';
}

function abilitaAggiorna(){
  document.getElementById('aggiornaAnimato1').style.display= 'none';
  document.getElementById('aggiornaFermo1').style.display= 'inline-block';
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
