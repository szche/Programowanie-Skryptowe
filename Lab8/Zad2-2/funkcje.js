var poprzednie_linijki = [];

function cyfry(napis) {
    var cyfry = 0;
    for(var i = 0; i < napis.length; i++) {
        var litera = parseInt(napis[i]);
        if(!isNaN(litera)) {
            cyfry++;
        }
    }
    return cyfry
}

function litery(napis) {
    return napis.length - cyfry(napis)
}

function podziel(napis) {
    zwroc = [];
    for(var i = 0; i < napis.length; i++) {
        wyraz = napis[i].split(' ');
        for(var j =0; j < wyraz.length; j++) {
            zwroc.push(wyraz[j]);
        }
    }
    return zwroc;
}

function znajdz_wystapienia(napis, szukane) {
    var wystapienia = 0;
    for(var i =0; i<napis.length; i++) {
        if (napis[i] == szukane) {
            wystapienia++;
        }
    }
    return wystapienia;
}

function liczba_w_linii(napis, liczba) {
    var linie = [];
    for(var i = 0; i<napis.length; i++) {
        var linijka = napis[i];
        var linijka_podzielona = linijka.split(" ");
        for(var j = 0; j<linijka_podzielona.length; j++) {
            var wyraz = linijka_podzielona[j];
            if (liczba == wyraz) {
                linie.push(i);
            }
        }
    }
    return linie;
}

function dzialaj(poprzednie, tekst) {
    var wynik = "";
    var wszystkie_linijki = []
    if (poprzednie == true) {
        wszystkie_linijki = poprzednie_linijki.concat(tekst.split("\n"));
    }
    else {
        wszystkie_linijki = tekst.split("\n");
    }
    console.log("Dzialam na: ", wszystkie_linijki);
    wszystkie_linijki_podzielone = podziel(wszystkie_linijki);
    console.log("Linijki podzielone: ",wszystkie_linijki_podzielone);

    textarea_podzielone = podziel( tekst.split("\n") );
    console.log("Input podzielony: ", textarea_podzielone);

    for(var i = 0; i< textarea_podzielone.length; i++) {
        var wyraz = textarea_podzielone[i];
        //Same cyfry
        if(cyfry(wyraz) == wyraz.length) {
            console.log("Cyfra \"",wyraz,"\" wystepuje w liniach: ", liczba_w_linii(wszystkie_linijki, wyraz));
            console.log()
            wynik += liczba_w_linii(wszystkie_linijki, wyraz).join(", ");
            wynik += ", ";

        }
        //Same litery
        if(litery(wyraz) == wyraz.length) {
            console.log("Wystapienia wyrazy \"",wyraz,"\" : ", znajdz_wystapienia(wszystkie_linijki_podzielone, wyraz));
            wynik = wynik + znajdz_wystapienia(wszystkie_linijki_podzielone, wyraz) + ", ";
        }
    }

    poprzednie_linijki = poprzednie_linijki.concat(tekst.split('\n'));
    console.log(wynik);
    return wynik;
}

function klik() {
    var formularz = document.forms["wejscie"];
    var tekst = formularz[0].value;
    var poprzednie = formularz[1].checked;

    var wynik = dzialaj(poprzednie, tekst);
}

