"use strict";
var assert = chai.assert;

describe('Test napisow', function() {
  it('Same cyfry', function() {
      var napis = "8183028378"
      assert.equal(cyfry(napis), 10);
      assert.equal(litery(napis), 0);
  });

  it('Same litery', function() {
      var napis = "kamnxncjui"
      assert.equal(cyfry(napis), 0);
      assert.equal(litery(napis), 10);
  });

  it('Litery, a po nich cyfry', function() {
    var napis = "alakot81723"
    assert.equal(cyfry(napis), 5);
    assert.equal(litery(napis), 6);
  });

  it('Cyfry, a po nich litery', function() {
    var napis = "12345alakot"
    assert.equal(cyfry(napis), 5);
    assert.equal(litery(napis), 6);
  });
  
  it('Pusty napis', function() {
    var napis = ""
    assert.equal(cyfry(napis), 0);
    assert.equal(litery(napis), 0);
  });
});
