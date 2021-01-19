/**
 * @param {string[]} tablica
 */
exports.parse = function parse(tablica) {
    let output = new Array();
    for(var i=0; i < tablica.length; i++) {
        if( tablica[i] == 'd-') output.push(0);
        else if (tablica[i] == 'd+') output.push(1);
        else if (tablica[i] == 'h-') output.push(2);
        else if (tablica[i] == 'h+') output.push(3);
    }
    return output;
}

