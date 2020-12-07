import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var expect = require('chai').expect;

import { jest_folderem, jest_plikiem } from "../module.js";



describe('Testy', function() {
  it('Czy plik test_file.txt jest plikiem', function() {
    var plik = jest_plikiem("test_file.txt");
    expect(plik).to.equal(true);
  });

  it('Czy plik test_file.txt jest folderem', function() {
    var plik = jest_folderem("test_file.txt");
    expect(plik).to.equal(false);
  });

  it('Czy folder test_folder jest plikiem', function() {
    var folder = jest_plikiem("test_folder");
    expect(folder).to.equal(false);
  });

  it('Czy folder test_folder jest folderem', function() {
    var folder = jest_folderem("test_folder");
    expect(folder).to.equal(true);
  });
});