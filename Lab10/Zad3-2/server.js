var http = require("http");
const { parse } = require("path");
var url = require("url");
const fs = require('fs').promises;



async function tresc(nazwa) {
    const data = await fs.readFile(nazwa, 'utf-8');
    return data;
}

async function sprawdz(nazwa) {
    try {
        var stat = await fs.lstat(nazwa);
        var folder = stat.isDirectory();
        var plik = stat.isFile();

        if(folder) return "folder";
        else if (plik) return "plik";
        else return "nic";
    } catch (e) {
        return false;
    }
}

async function zapisz(nazwa, dane) {
    await fs.writeFile(nazwa, dane, function (err) {
        if (err) return console.log(err);
        console.log('Zapisano');
    });
}


http.createServer(function(request, response) {
    /*
      ,,request'' - input stream - contains data received from the browser, e.g. encoded contents of HTML form fields

      ,,response'' - output stream - put in it data that you want to send back to the browser.
         The answer sent by this stream must consist of two parts: the header and the body.
         The header contains, among others, information about the type (MIME) of data contained in the body.
         The body contains the correct data, e.g. a form definition.

    */
    console.log("--------------------------------------")
    console.log("The relative URL of the current request: "+request.url+"\n")
    var url_parts = url.parse(request.url,true); //parsing (relative) URL

    if(url_parts.pathname == '/submit') { //Processing the form content, if the relative URL is '/ submit'
	    var nazwa=url_parts.query['nazwa']; //Read the contents of the field (form) named 'name'
        var linia = url_parts.query['linia'];
        var usuniecie = url_parts.query["delete"];
        var scalenie = url_parts.query["merge"];
        console.log(nazwa, linia, usuniecie, scalenie);
        
        sprawdz(nazwa).then((wynik) => {
            response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});  //Creating an answer header - we inform the browser that the body of the answer will be plain text

            console.log("Wynik funkcji: ", wynik);
            if(wynik == "plik") {
                response.write("Nazwa reprezentuje plik!");
                
                if(usuniecie == 'usun') {
                    console.log("===== USUN LINE ======");
                    console.log("Linia: ", linia);
                    tresc(nazwa).then((wynik) => {
                        var wynik_split = wynik.split('\n');
                        var nowe_dane = wynik_split.slice(0, parseInt(linia)-1).concat(wynik_split.slice(parseInt(linia), wynik_split.length)).join('\n');
                        console.log("Po usunieciu: ", nowe_dane);

                        zapisz(nazwa, nowe_dane).then((wynik) => {
                            response.write('\nNowa tresc:\n');
                            tresc(nazwa).then((wynik) => {
                                    response.write(wynik);
                                    response.end();
                            });
                        });

                    });
                    
                }
                else if(scalenie == "scal"){
                    console.log("===== SCAL LINE ======");

                    console.log("Linia: ", linia);
                    tresc(nazwa).then((wynik) => {
                        var wynik_split = wynik.split('\n');
                        var scalone = wynik_split.slice(parseInt(linia)-1, parseInt(linia) + 1).join("");
                        var przed = wynik_split.slice(0, parseInt(linia) -1);
                        var po = wynik_split.slice(parseInt(linia)+ 1, wynik_split.length);
                        var scalone = przed.concat(scalone).concat(po).join('\n');

                        zapisz(nazwa, scalone).then((wynik) => {
                            response.write('\nNowa tresc:\n');
                            tresc(nazwa).then((wynik) => {
                                    response.write(wynik);
                                    response.end();
                            });
                        });



                    });

                }

                
            }
            else if(wynik == "folder") {
                response.write("Nazwa reprezentuje folder!");
                response.end();
            }
            else {
                response.write("Ani plik ani folder!");
                response.end(); 
            }
          }).catch(e => console.log(e));
        
    }
    else { //Generating the form
	    console.log("Creating a response header")
	    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});  //Creating a repsonse header - we inform the browser that the body of the response will be HTML text
	    //and now we put an HTML form in the body of the answer
            console.log("Creating a response body")
	    response.write('<form method="GET" action="/submit">');
	    response.write('<label for="nazwa">Podaj nazwe: </label>');
	    response.write('<input name="nazwa">');
        response.write('<br>');
        response.write('<label for="linia">Podaj numer linii: </label>');
        response.write('<input type="number" name="linia">');
        response.write('<br>');
        response.write('<label for="delete">Usuniecie linii</label>');
        response.write('<input type="radio" name="delete" id="delete" value="usun">');
        response.write('<br>');
        response.write('<label for="merge">Scalenie linii</label>');
        response.write('<input type="radio" name="merge" id="merge" value="scal">');
        response.write('<br>');
	    response.write('<input type="submit">');
	    response.write('<input type="reset">');
	    response.write('</form>');
	    response.end();  //The end of the response - send it to the browser
	    console.log("Sending a response")
    }
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");