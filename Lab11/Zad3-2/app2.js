// Application using the 'Pug' template system
var request = require("request")

var express = require('express'),
    logger = require('morgan');
var app = express();

app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          //Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory



function zapytaj(adres) {
    const p = new Promise((resolve, reject) => {
        request(adres, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let jsoned = JSON.parse(body);
                resolve(jsoned['rates']);
            }
            else {
                resolve( [0, 0] );
            }
        });

      });
    return p;
}


async function zbierzDane(req) {

    var dane = {};
    console.log(req.params);
    var waluty = req.params[0].split("/");
    let data1 = req.params['data1'];
    let data2 = req.params['data2'];

    for(var i = 0; i < waluty.length; i++) {
        console.log("Waluta: ", waluty[i], data1, data2);
        await zapytaj(`http://api.nbp.pl/api/exchangerates/rates/c/${waluty[i]}/${data1}/${data2}/?format=json`).then( d => {
            console.log(d);
            dane[waluty[i]] = d;
            //dane.push(d);
        });
    };
    console.log(dane);
    return dane;
}


// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          //Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {    
    res.render('index', {x: x, y: y}); 
});

app.get('/average/:data1/:data2/*', async function (req, res) {
    zbierzDane(req).then(odp => {
        res.render('index', {waluty: Object.keys(odp), ceny: odp});
    })   
})


// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});