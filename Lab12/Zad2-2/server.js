var http = require("http");
var url = require("url");
var fs = require("fs");
var request = require("request")
var file = 'form.html';
var xml = require('xml');


function zapytaj(adres) {
    const p = new Promise((resolve, reject) => {
        request(adres, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
            else {
                resolve("error");
            }
        });

      });
    return p;
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
    case '/ask':
        const area = url_parts["query"]['area'];
        const location = url_parts["query"]['location'];
        const url = `http://worldtimeapi.org/api/timezone/${area}/${location}.txt`;
        //console.log("Pytam: ", url);
        zapytaj(url).then( d => {
            const odpowiedz = d.split('\n');
            var data = "";
            if (odpowiedz.length > 1) {
                data = odpowiedz[2].substring(10);
            }
            else data = "Error";
            console.log("Data: ", data);
            response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            response.write(data); // Data (response) that we want to send to the web browser
            response.end(); // Sending the answer
            console.log("The server sent the "+data+" text to the browser");
        });        
      break;
    // Other cases

  } //switch
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");
