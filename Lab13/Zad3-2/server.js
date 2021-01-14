var http = require("http");
var url = require("url");
var fs = require("fs");
var file = 'form.html';
const util = require('util');

var pliki = [];
async function zrob(plik, napis) {
  const send_back = [];
  var promiseArray = [];

  for(var i=0; i<pliki.length; i++) {

    promiseArray.push(new Promise((resolve, reject) => {
      console.log("Checking against: ", pliki[i])
      if( plik.length == 0 ) resolve();
        if( plik.length > pliki[i][0].length) resolve();
        //console.log("Porownuje z: ", pliki[i]);
        //console.log(plik, pliki[i].substr(0, plik.length));

        if(plik == pliki[i][0].substr(0, plik.length)) {
          const foundFile = pliki[i][0];
          const dataFile = pliki[i][1];
          console.log(foundFile, dataFile);
          if( dataFile.includes(napis) ) {
            console.log("Good job");
            resolve( [foundFile, dataFile] );
          }
          else resolve();
        }
        resolve();
    }))
    //end_back.push(p);
  }
  Promise.all(promiseArray).then(d => {
    console.log(d);
    console.log("DONE");
    return d;
  });
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
        const plik = url_parts["query"]['plik'];
        const napis = url_parts["query"]['napis'];
        console.log("Dostalem: ", plik, napis);

        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write('<ol>');

        var promiseArray = [];
        
        for(var i=0; i<pliki.length; i++) {
          promiseArray.push(new Promise((resolve, reject) => {
            console.log("Checking against: ", pliki[i])
            if( plik.length == 0 ) resolve();
            if( plik.length > pliki[i][0].length) resolve();

        
            if(plik == pliki[i][0].substr(0, plik.length)) {
              const foundFile = pliki[i][0];
              const dataFile = pliki[i][1];

              if( dataFile.includes(napis) ) {
                const napisBeg = dataFile.search(napis);
                const nAfternapis = dataFile.substr(napisBeg, ).search('\n');
                var linijka = ''
                if(nAfternapis == -1) linijka = dataFile.substr(napisBeg, );
                else linijka = dataFile.substr(napisBeg, nAfternapis);
                console.log("Found in: ", napisBeg, nAfternapis);
                response.write(`<li>${foundFile}<ul>${linijka}</ul></li>`);
                resolve();
                
              }
              else resolve();
             }
            resolve();
          }))
      }
      Promise.all(promiseArray).then(d => {
        response.write("</ol>")
        response.end();
      });

      break;
    // Other cases

  } //switch
}).listen(8080);


fs.readdirSync('pliki').forEach(file => {
  const sciezka = 'pliki/'+file;
  const data = fs.readFileSync(sciezka, 'utf8'); 
  console.log(data);
  pliki.push( [file, data] )

});
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");
console.log(pliki);
