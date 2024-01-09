console.log('this is the T9 annotator');

const fs = require('fs');
const keyboard = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
};

fs.readFile('wordlist.10000.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});  

