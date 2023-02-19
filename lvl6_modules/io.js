const { nextChar } = require('./utils');

const info = `
Welcome to the CCC-SCHOOL-SNACK-VENDOR-MACHINE Level 6!
We need your input on this: 
 - LAST_ITEM which is in A-Z1-26 format
 - STARTING_ITEM A-Z1-26 format
 - ENDING_ITEM A-Z1-26 format
 - BLOCKED_MOVE:
    * 0 - Right
    * 1 - Up-Right
    * 2 - Up
    * 3 - Up-Left
    * 4 - Left
    * 5 - Down-Left
    * 6 - Down
    * 7 - Down-Right
The input is in the next format (ex: Z2 A1 Z1 6):
LAST_ITEM STARTING_ITEM ENDING_ITEM BLOCKED_MOVE

Type input:
`

let input = 'Z2 A1 Z1 6';
const items = {}; // the matrix (flattened) stored as a map
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * The input is typed by the user. Otherwise Z2 A1 Z1 6 will be used. 
 * @param {*} interactive whether the user has to type the input
 */
async function buildInput(interactive) {
    if (!interactive) return;
    input = await new Promise((res, rej) => {
        readline.question(info, userInput => { 
            readline.close();
            res(userInput);
        });
    }); 
}

function buildDataFromInput() {
    const values = input.split(' ');
    const lastItem = values[0];
    const maxLetter = lastItem[0];
    const maxNumber = Number.parseInt(lastItem.slice(1));
    
    for (let letter = 'A'; letter <= maxLetter; letter=nextChar(letter)) {
        const item = items[letter] || {};
        for (let index = 1; index <= maxNumber; index++) {
            item[index] = ' ';
            items[letter] = item;
        }
    }
    
    const [startingPosition, endingPosition, blockedMove] = values.slice(1);
    const startingItem = buildItem(startingPosition); // just a copy
    const endingItem = buildItem(endingPosition); // just a copy

    return {startingItem, endingItem, blockedMove};
}

function buildItem(position) {
    const letter = position[0];
    const index = Number.parseInt(position.slice(1));
    return {letter, index};
}

function plotTraceResult(traceResult) {
    const { startingItem, endingItem, seconds, moves, blockedMove } = traceResult;

    
    moves.forEach((move, index) => {
        items[move.letter][move.index] = `${index + 1}`;
    })

    items[startingItem.letter][startingItem.index] = 'S';
    items[endingItem.letter][endingItem.index] = 'E';

    console.table(items);
    console.log(`Seconds: ${seconds}`);
    console.log(`Blocked move: ${translateBlockedMove(blockedMove)}`)
}

function translateBlockedMove(blockedMove) {
    switch(Number.parseInt(blockedMove)) {
        case 0: return '0 (Right)'
        case 1: return '1 (Up-Right)'
        case 2: return '2 (Up)'
        case 3: return '3 (Up-Left)'
        case 4: return '4 (Left)'
        case 5: return '5 (Down-Left)'
        case 6: return '6 (Down)'
        case 7: return '7 (Down-Right)'
    }
}

module.exports = {
    buildDataFromInput,
    buildInput,
    plotTraceResult
}