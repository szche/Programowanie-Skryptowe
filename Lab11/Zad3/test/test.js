//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
var assert = require('assert');



// UNIT test begin
describe('GET /', function() {
      it('Wykoanie operacji', function() {
          var server = supertest.agent("http://localhost:3000/perform/operations.json");
          
          const expected_result = [
            { operacja: 'add', x: 2, y: 3, result: 5 },
            { operacja: 'sub', x: 2, y: 3, result: -1 },
            { operacja: 'mul', x: 2, y: 3, result: 6 },
            { operacja: 'div', x: 10, y: 5, result: 2 }
          ];
          
          return server.get('/')
          .expect(200)
          .then(response => {
              var counter = 0;
              response.body.forEach(element => {
                  assert(element, expected_result[counter])
                  counter += 1;
              });
        })
    });


}); 


