import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');


export function jest_folderem(plik) {
    try {
        var stat = fs.lstatSync(plik);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
}

export function jest_plikiem(plik) {
    try {
        var stat = fs.lstatSync(plik);
        return stat.isFile();
    } catch (e) {
        return false;
    }
}

