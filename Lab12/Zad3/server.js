var http = require("http");
var url = require("url");
var fs = require("fs");
var request = require("request")
var file = 'form.html';

const spolki = [
  ["Apple", 100, 200 ],
  ["Microsoft", 300, 500] ,
  ["Tesla", 20, 100 ],
  ["Amazon", 1000, 3000] ,
  ["Visa", 300, 400 ],
  ["Nvidia", 900, 1000 ],
  ["Walmart", 100, 500 ],
  ["Boeing", 20, 100 ]
];


async function zbierz(request, url_parts) {
  if(request.method === 'POST') {
      let body = '';
      await request.on('data', (chunk) => {
          body += chunk.toString();
      });
      return body;
  }
  else {
      const imie = await url_parts["query"]['imie'];
      return imie;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



http.createServer(function (request, response) {
  console.log("--------------------------------------");
  console.log("The relative URL of the current request: " + request.url + "\n");
  var url_parts = url.parse(request.url, true);  // parsing (relative) URL
  //Compare the relative URL
  switch (url_parts.pathname) {

    // if relative URL is '/' then send, to a browser,
    // the contents of a file (an HTML document) - its name contains the 'file' variable
    case '/':
      fs.stat(file, function (err, stats) {
        if (err == null) { // If the file exists
          fs.readFile(file, function (err, data) { // Read it content
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.write(data);   // Send the content to the web browser
            response.end();
          });
        }
        else { // If the file does not exists
          response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          response.write('The ' + file + ' file does not exist');
          response.end();
        } //else
      }); //fs.stat
      break;

    // Process the form content if relative URL is '/submit'
    case '/submit':
        zbierz(request, url_parts).then((liczba) => {
          const liczba_spolek = parseInt(liczba);
          let spolki_odp = [];

          for(var i = 0; i < liczba_spolek; i++) {
              var wylosowana = getRandomInt(0, spolki.length - 1);
              while ( spolki_odp.includes(wylosowana) ) {
                  var wylosowana = getRandomInt(0, spolki.length - 1);
              }
              spolki_odp.push(wylosowana);

          }

          response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          response.write("<html><head><body><table>")
          let res = [];
          for (var i = 0; i < spolki_odp.length; i++) {
            let spolka = spolki[ spolki_odp[i] ];
            let cena = getRandomInt( spolka[1], spolka[2] );
            response.write(`<tr><td>${spolka[0]}</td><td>${cena}</td></tr>`)
          }
          response.write("</table></body></head></html>")
          
          //console.log("Wylosowano: ", res);
          //response.write(res); // Data (response) that we want to send to the web browser
          response.end(); // Sending the answer
      })
      break;
    // Other cases

  } //switch
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");
