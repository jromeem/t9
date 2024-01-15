const fs = require('fs');

// Initializing the dictionary with the isWord functionality
function loadDictionary() {
    try {
        // Synchronously read the file contents and return the word array
        const data = fs.readFileSync('wordlist.10000.txt', 'utf-8');
        const wordList = data.split(/\r?\n/);
        return {
            isWord: (input) => wordList.includes(input)
        }
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

// filtering out the permutations that are words using the dictionary's isWord function
function filterWords(listAllPerms, listAllWords) {
    return listAllPerms.filter(listAllWords.isWord);
}

// creating the permutations using tail recursion
function makePerms(input) {
    const perms = [];
    return makePermsRecursive(perms, input);
}

// tail recursive function
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

function isNumeric(str) {
    return /^[0-9]+$/.test(str);
}

function main() {
    if (process.argv.length < 2) {
        console.error('Please provide an numeric input argument: [0 - 9]');
        process.exit(1);
    }
    
    const arg = process.argv[2];
    if (!isNumeric(arg)) {
        console.error('Please provide an numeric input argument: [0 - 9]');
        process.exit(1);
    }

    const input = arg;
    const dict = loadDictionary();
    const validWords = findWords(input, dict);
    console.log('\ninput: ', input);
    console.log("valid words:\n", validWords);
}

main();