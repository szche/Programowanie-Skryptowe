
function klik() {
	var formularz = document.forms["wejscie"];
	document.getElementById("wypisz_tekst").innerText = formularz[0].value
	document.getElementById("wypisz_liczbe").innerText = formularz[1].value
}