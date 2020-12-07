import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
import { jest_folderem, jest_plikiem } from "./module.js";



var myArgs = process.argv.slice(2);
if ( jest_folderem(myArgs[0]) ) {
    console.log("Podana nazwa reprezentuje folder!");
}
else if ( jest_plikiem(myArgs[0]) ) {
    console.log("Podana nazwa jest plikiem!\nTresc:");
    const data = fs.readFileSync(myArgs[0], 'utf8')
    console.log(data);
}