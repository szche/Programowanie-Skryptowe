import { Operation } from './module.js';


var myArgs = process.argv.slice(2);
console.log( new Operation(parseInt(myArgs[0]), parseInt(myArgs[1])).sum() );