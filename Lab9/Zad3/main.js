var liczba = 0;

function odliczaj() {
    if(liczba < 0) return;

    //Wpisz do spanow
    var azure = document.querySelectorAll('.sp');
    for(var i=0; i<azure.length; i++) {
        azure[i].textContent = liczba;
    }
    liczba--;
}


function klik() {
    var zmienna = document.getElementById('liczba').value;
    if(zmienna <= 0) return;
    liczba = zmienna;    
}