function caricaPagina(){
  aggiornaContatori();
  var salvato1=localStorage['BN1'];
  var salvato2=localStorage['BN2'];
  if(salvato1!=null) document.getElementById('contatoreSalvato1').innerHTML = localStorage['BN1'];
  if(salvato2!=null) document.getElementById('contatoreSalvato2').innerHTML = localStorage['BN2'];

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
