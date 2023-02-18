const input = 'P15 I9 D7'
const values = input.split(' ');

/**
 * based on the last item, you need to build the matrix of the items.
 * The letter (A-Z) will give you the number of rows
 * The index (1-26) will give you the number of columns.
 */
const lastItem = values[0];
const maxLetter = lastItem[0];
const maxNumber = Number.parseInt(lastItem.slice(1));

const items = {}; // the matrix (flattened) stored as a map

for (let letter = 'A'; letter <= maxLetter; letter=nextChar(letter)) {
    for (let index = 1; index <= maxNumber; index++) {
        const item = {
            letter,
            index
        };
        items[`${letter}${index}`] = item;
    }
}

/**
 * The moves will be stored only for debugging purposes.
 * Since we don't need the move, we can exchange the starting and ending items
 * so that we only go from top to bottom in the vending machine (items matrix)
 */

const [startingPosition, endingPosition] = values.slice(1).sort();

const startingItem = {...items[startingPosition]}; // just a copy
const endingItem = {...items[endingPosition]}; // just a copy

let seconds = 0;
let moves = [];

/**
 * Try to go as diagonally as possible to save up seconds.
 * Move diagonally until you've reached the same column/row as the ending item.
 * same column: move left/right
 * same row: move down
 */

while(true) {
    if (startingItem.letter < endingItem.letter) {
        if (startingItem.index < endingItem.index) {
            moveDownRight(startingItem);
        } else if (startingItem.index > endingItem.index) {
            moveDownLeft(startingItem);
        } else {
            moveDown(startingItem);
        }
    }
    if (startingItem.letter == endingItem.letter) {
        if (startingItem.index < endingItem.index) {
            moveRight(startingItem);
           
        } else if (startingItem.index > endingItem.index) {
            moveLeft(startingItem);
        }
    }
    moves.push(`${startingItem.letter}${startingItem.index}`);
    seconds++;

    if (startingItem.letter === endingItem.letter && startingItem.index === endingItem.index) {
        break;
    }
}


console.log(moves)
console.log(seconds)

function moveDownRight(startingItem) {
    const newLetter = nextChar(startingItem.letter);
    const newIndex = startingItem.index+1;
    startingItem.letter = newLetter;
    startingItem.index = newIndex;
}

function moveDownLeft(startingItem) {
    const newLetter = nextChar(startingItem.letter);
    const newIndex = startingItem.index-1;
    startingItem.letter = newLetter;
    startingItem.index = newIndex;
}

function moveDown(startingItem) {
    const newLetter = nextChar(startingItem.letter);
    startingItem.letter = newLetter;
}


function moveRight(startingItem) {
    const newIndex = startingItem.index+1;
    startingItem.index = newIndex;
}

function moveLeft(startingItem) {
    const newIndex = startingItem.index-1;
    startingItem.index = newIndex;
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
