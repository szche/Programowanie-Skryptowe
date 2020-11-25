"use strict";
var suma_cyfr = 0;


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

function suma(napis) {
    if( cyfry(napis[0]) == 0 ) return;
    var liczba = "";
    for(var i = 0; i < napis.length; i++) {
        var litera = parseInt(napis[i]);
        if(isNaN(litera)) break;
        liczba += napis[i];
    }
    suma_cyfr += parseInt(liczba);
}

function sprawdz(napis) {
    suma(napis);
    document.getElementById("wyniki").innerHTML += '</br>'+napis;
    document.getElementById("wyniki").innerHTML += '</br>&nbsp;&nbsp;Cyfry: '+cyfry(napis);
    document.getElementById("wyniki").innerHTML += '</br>&nbsp;&nbsp;Litery: '+litery(napis);
    document.getElementById("wyniki").innerHTML += '</br>&nbsp;&nbsp;Suma: '+suma_cyfr+'</br>';
}

function petla_program() {
    while(true) {
        var zapytanie = window.prompt("Podaj napis");
        if(zapytanie == null) break;
        sprawdz(zapytanie);
    }   
}