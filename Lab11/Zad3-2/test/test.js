//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
var assert = require('assert');



// UNIT test begin
describe('GET /', function() {
      it('Z liczbami w URL', function() {
          var server = supertest.agent("http://localhost:3000/add/2/3");
          return server.get('/')
          .expect(200)
          .then(response => {
              assert(response.text == '<p>2 + 3 = 5</p>');
        })
    });

    it('Z liczbami w kodzie zrodlowym', function() {
        var server = supertest.agent("http://localhost:3000");
        return server.get('/')
        .expect(200)
        .then(response => {
            assert(response.text == '<p>1 + 2 = 3</p>');
      })
  });



}); 


