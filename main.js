const fs = require('fs');

// Initializing the word list into memory
function loadWordList() {
    try {
        // Synchronously read the file contents and return the word array
        const data = fs.readFileSync('wordlist.10000.txt', 'utf-8');
        return data.split(/\r?\n/);
    } catch (err) {
        throw new Error('Failed to load word list:', err);
    }
}

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
    const perms = makePerms(input);
    const foundWords = filterWords(perms, dict);
    return foundWords;
}

function filterWords(listAllPerms, listAllWords) {
    return listAllPerms.filter((perm) => listAllWords.includes(perm));
}

// creating the permutations with tail recursion
function makePerms(input) {
    const perms = [];
    return makePermsRecursive(perms, input);
}

function makePermsRecursive(perms, input) {
    // representing our phone keyboard
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

    // base case
    if (input.length === 0) {
        return perms;

    // first recursive case
    } else {
        const firstDigit = parseInt(input[0]);
        const keysLetters = keyboard[firstDigit] ? keyboard[firstDigit].split('') : [];
        const restSeq = input.slice(1);
    
        // the first recursive iteration
        if (perms.length === 0) {
            perms = keysLetters.slice('');

        // create a new set of permutations
        } else {
            const newPerms = [];
            perms.forEach((item) => {
                keysLetters.forEach((letter) => {
                    newPerms.push(item + letter);
                });
            });

            // update the permutations after
            perms = newPerms;
        }

        // recurs over the new set of permutations
        return makePermsRecursive(perms, restSeq);
    }
}

function main() {
    const input = '4663';
    const wordList = loadWordList();
    const validWords = findWords(input, wordList);
    console.log(validWords);
}

main();