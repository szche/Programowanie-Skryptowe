import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var expect = require('chai').expect;
import { Operation } from '../module.js';


describe('The sum() method', function() {
  it('Returns 4 for 2+2', function() {
    var op = new Operation(2,2);
    expect(op.sum()).to.equal(4);
  });
  it('Returns 0 for -2+2', function() {
    var op = new Operation(-2,2);
    expect(op.sum()).to.equal(0);
  });
});