// Application using the 'Pug' template system
var request = require("request")

var express = require('express'),
    logger = require('morgan');
var app = express();


Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


function zapytaj(adres) {
    const p = new Promise((resolve, reject) => {
        request(adres, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let jsoned = JSON.parse(body);
                //console.log( [jsoned["rates"][0]['bid'], jsoned["rates"][0]['effectiveDate']] );
                resolve([jsoned["rates"][0]['bid'], jsoned["rates"][0]['effectiveDate']]);   
            }
            else {
                resolve( [0, 0] );
            }
        });

      });
    return p;
}


async function zbieraj(element, dataOb1, dataOb2) {
    var kursWaluty = [];
    console.log("Waluta: ", element);
    let dataCall = dataOb1;
    while(dataCall <= dataOb2) {
        var dataZapytania = `${dataCall.getFullYear()}-${ ('0'+dataCall.getMonth()).slice(-2)}-${ ('0'+dataCall.getDate()).slice(-2)}`
        await zapytaj(`http://api.nbp.pl/api/exchangerates/rates/c/${element}/${dataZapytania}/?format=json`).then((data) => {
            //console.log(element, data);
            kursWaluty.push(data);
        });
        
        dataCall = dataCall.addDays(1);
    }
    return kursWaluty;
}

async function zbierzDane(req) {

    var dane = [];
    console.log(req.params);
    var waluty = req.params[0].split("/");
    let data1 = req.params['data1'];
    let data2 = req.params['data2'];

    let dataOb1 = new Date(data1.split('-')[0], data1.split('-')[1], data1.split('-')[2]);
    let dataOb2 = new Date(data2.split('-')[0], data2.split('-')[1], data2.split('-')[2]);

    waluty.forEach(element => {

        zbieraj(element, dataOb1, dataOb2).then((data) => {
            console.log("Dane: ", data);
            dane.push({
                "waluta": element,
                "kurs": data
            });
        });

     });
    console.log("KONCOWE DANE:", dane);
    
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
    const dane = await zbierzDane(req);
    console.log(dane);
    res.send(`<h1>Hello World!</h1>`);
   
})


// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});