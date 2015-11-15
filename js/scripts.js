function caricaPagina(){
  document.getElementById('conto1').style.display = 'none';
  document.getElementById('conto2').style.display = 'none';
  aggiornaContatori();
  var salvato1=localStorage['BN1'];
  var salvato2=localStorage['BN2'];
  if(salvato1!=null){
    document.getElementById('contatoreSalvato1').innerHTML = localStorage['BN1'];
    document.getElementById('scontrino1').disabled = false;
  }
  if(salvato2!=null){
    document.getElementById('contatoreSalvato2').innerHTML = localStorage['BN2'];
    document.getElementById('scontrino2').disabled = false;
  }
}

function aggiornaContatori(){
  disabilitaAggiorna();
  $.get("http://jsonplaceholder.typicode.com/posts", function(data){
    fooGetCounter(data);
    abilitaAggiorna();
  });
}

function fooGetCounter(data){
  document.getElementById('contatore1').innerHTML= Date.now();
  document.getElementById('contatore2').innerHTML= Date.now();
}

function salvaContatori(id){
  var nome = "BN" + id
  disabilitaAggiorna();
  $.get("http://jsonplaceholder.typicode.com/posts", function(data){
    fooGetCounter(data);
    abilitaAggiorna();
    var contatore = document.getElementById('contatore'+id).innerHTML;
    localStorage[nome] = contatore;
    document.getElementById('contatoreSalvato'+id).innerHTML = contatore;
    document.getElementById('scontrino'+id).disabled = false;
  });
}

function calcolaConto(id){
  var nome = "BN" + id
  disabilitaAggiorna();
  $.get("http://jsonplaceholder.typicode.com/posts", function(data){
    fooGetCounter(data);
    abilitaAggiorna();
    var contatore = document.getElementById('contatore'+id).innerHTML;
    var differenza = contatore - localStorage[nome];
    document.getElementById('conto'+id).innerHTML = "Sono state fatte <em>"  + differenza +
    " facciate</em> dall'ultimo contatore salvato, per un totale di <strong>" +
    differenza*3/100 + "€.</strong><br/>(Non comprensivo di apertura file!)";
    document.getElementById('contatoreSalvato'+id).innerHTML = contatore;
    document.getElementById('conto'+id).style.display = 'block';
  });
}

function disabilitaAggiorna(){
  document.getElementById('aggiornaFermo').style.display= 'none';
  document.getElementById('aggiornaAnimato').style.display= 'inline-block';
}

function abilitaAggiorna(){
  document.getElementById('aggiornaAnimato').style.display= 'none';
  document.getElementById('aggiornaFermo').style.display= 'inline-block';
}
