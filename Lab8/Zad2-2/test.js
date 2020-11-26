var assert = chai.assert;

describe('Test skryptu', function() {
  it('Dla tekstu: "Ala ma kota(NEWLINE)123(NEWLINE)kot ma ala"', function() {
      var napis = "ala ma kota\n123 kot ma ala";
      assert.equal( dzialaj(true, napis), "2, 2, 1, 1, 1, 2, 2, " );
  });

  it('Poprzednie plus tekst "Jeden dwa trzy(NEWLINE)1 2 3(NEWLINE)123"', function() {
    var napis = "jeden dwa trzy\n1 2 3\n123";
    assert.equal( dzialaj(true, napis), "1, 1, 1, 3, 3, 3, 1, 4, " );
});

it('Tekst bez poprzednika "Jeden dwa trzy(NEWLINE)1 2 3(NEWLINE)123"', function() {
  var napis = "jeden dwa trzy\n1 2 3\n123";
  assert.equal( dzialaj(false, napis), "1, 1, 1, 1, 1, 1, 2, " );
});

});
