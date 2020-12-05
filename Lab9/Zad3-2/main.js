var graj = true;
var poczatkoweKolumny = 5;
var wiersze = 10;

var wynik = 0;

var zmien_zawartosc_komorki = 2000;
var dodaj_kolumne = 3000;

var zmienKomorkeInterval;
var doajKolumneInterval;
var sprawdzWarunkiGryInterval;

function addPoint() {
    wynik += parseInt(this.textContent);
}


function utworzTabelePoczatkowa() {
    var tabela = document.getElementById("gameTable");
    for (var i = 0; i < wiersze; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < poczatkoweKolumny; j++) {
          var td = document.createElement('td');
          td.appendChild(document.createTextNode( getRandomInt(-1, 1) ));
          td.addEventListener("click", addPoint, false); 
          tr.appendChild(td);
        }
      tabela.appendChild(tr);
    }
  }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateScore() {
    document.getElementById("wynik").textContent = "Twoj wynik: " + wynik;
}

function zmienKomorke() {
    var komorki = document.querySelectorAll('td');
    var losowa_liczba = getRandomInt(0, komorki.length-1);

    //console.log("Wylosowana komorka: ", komorki[losowa_liczba]);
    komorki[losowa_liczba].textContent = getRandomInt(-1, 1);
}

function dodajKolumne() {
    var wiersze = document.querySelectorAll('tr');
    var los = getRandomInt(0, 1);
    for(var j = 0; j < wiersze.length; j++) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode( getRandomInt(-1, 1) ));
        td.addEventListener("click", addPoint, false); 

        //Jesli los == 0 -> Dodaj na poczatku
        //Jelis los == 1 -> Dodaj na koniec
        if(los == 0) {
            var poczatkowaKolumna = wiersze[j].getElementsByTagName("td").item(0);
            wiersze[j].insertBefore(td, poczatkowaKolumna);
            console.log("Dodane na poczatku");
        }
        else {
            wiersze[j].appendChild(td);
            console.log("Dodane na koncu");
        }
    }
}

function sprawdzWarunkiGry() {
    var komorki = document.querySelectorAll('td');
    var wiersze = document.querySelectorAll('tr');
    var koniec = komorki.length / wiersze.length;
    console.log("Liczba kolumn: ", koniec);

    if(koniec == 10) {
        console.log("koniec gry!");
        updateScore();
        clearInterval(zmienKomorkeInterval);
        clearInterval(doajKolumneInterval);
        clearInterval(sprawdzWarunkiGryInterval);
    }
}

function gameLoop() {
    zmienKomorkeInterval = setInterval(zmienKomorke, zmien_zawartosc_komorki);
    doajKolumneInterval = setInterval(dodajKolumne, dodaj_kolumne);
    sprawdzWarunkiGryInterval = setInterval(sprawdzWarunkiGry, 1000);

}