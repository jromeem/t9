
const fs = require('fs');
let wordList = [];

// const stubbed_dictionary = {
//     // This is just a fake dictionary for testing purposes.
//     isWord: input => input.length % 2 === 0,
// };

// Reading in the word list file
fs.readFileSync('wordlist.10000.txt', (err, data) => {
    if (err) throw err;
    // Array of all words in the MIT dictionary of the first 10,000 most common english words
    wordList = data.toString('utf-8').split(/\r?\n/);
});

/**
 * Find all of the valid (according to {@code dict#isWord(string)}) words which
 * can be formed from the given input sequence.
 *
 * If you want to use a different input format, alternatives can be discussed.
 *
 * @param {string} input the sequence of buttons pressed
 * @param {{ isWord: (in: string) => boolean }} dict the dictionary implementation
 */

function findWords(input, dict) {
    // TODO: Find all of the words which can be created
}

console.log(findWords('4663', stubbed_dictionary));
