console.log('this is the T9 annotator');

const fs = require('fs');
let labeled = {};
let collidedKeys = [];

// reading in the word list file
fs.readFile('wordlist.10000.txt', (err, data) => {
    if (err) throw err;
    // array of all words in the MIT dictionary of common 10,000 english words
    const words = data.toString('utf-8').split(/\r?\n/);
    labelData(words);
    findCollitions(labeled);
    console.log(collidedKeys)
});

// finding collisions just for sanity checking the dictionary
function findCollitions(wordsDict) {
    Object.keys(wordsDict).forEach((t9string) => {
        const list = wordsDict[t9string];
        if (list.length > 1) {
            collidedKeys.push(`${t9string} -> ${list}}`);
        }
    })
}

// label the data
function labelData(words) {
    words.forEach((word) => {
        let t9Translated = '';
        for (let i = 0; i < word.length; i++) {
            const letter = word[i];
            switch (letter) {
                case 'a': t9Translated += '2'; break;
                case 'b': t9Translated += '2'; break;
                case 'c': t9Translated += '2'; break;
                case 'd': t9Translated += '3'; break;
                case 'e': t9Translated += '3'; break;
                case 'f': t9Translated += '3'; break;
                case 'g': t9Translated += '4'; break;
                case 'h': t9Translated += '4'; break;
                case 'i': t9Translated += '4'; break;
                case 'j': t9Translated += '5'; break;
                case 'k': t9Translated += '5'; break;
                case 'l': t9Translated += '5'; break;
                case 'm': t9Translated += '6'; break;
                case 'n': t9Translated += '6'; break;
                case 'o': t9Translated += '6'; break;
                case 'p': t9Translated += '7'; break;
                case 'q': t9Translated += '7'; break;
                case 'r': t9Translated += '7'; break;
                case 's': t9Translated += '7'; break;
                case 't': t9Translated += '8'; break;
                case 'u': t9Translated += '8'; break;
                case 'v': t9Translated += '8'; break;
                case 'w': t9Translated += '9'; break;
                case 'x': t9Translated += '9'; break;
                case 'y': t9Translated += '9'; break;
                case 'z': t9Translated += '9'; break;
                default: break;
            }
        }
        if (t9Translated in labeled) {
            labeled[t9Translated].push(word);
        } else {
            labeled[t9Translated] = [word];
        }
    });
}