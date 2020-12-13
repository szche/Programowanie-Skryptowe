// No use of any template system
var express = require('express'),
    logger = require('morgan');
var app = express();
const fs = require('fs');

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {     // The first route
    res.send(`<h1>Use /perform/file.json </h1>`);

})

app.get('/perform/:f', function (req, res) {
    console.log("Plik: ", req.params['f']);

    let plik = fs.readFileSync(req.params['f']);
    let dane = JSON.parse(plik);

    dane.forEach(element => {
        const x = parseInt(element['x']);
        const y = parseInt(element['y']);
        switch (element['operacja']) {
            case 'add':
              element['result'] = x+y;
              break;
            case 'sub':
                element['result'] = x-y;
                break;
            case 'mul':
                element['result'] = x*y;
                break;
            case 'div':
                element['result'] = x/y;
                break;
          }
    });
    console.log(dane);
    res.send(dane);
})


// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});