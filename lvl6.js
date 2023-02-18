/**
 * Super complicated, over-engineered, extensible, cool, 3AM solution for lvl6
 */
const input = 'Z2 A1 Z1 6'
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
 * Possible commands for robots
 * R = Right
 * L = Left
 * U = Up
 * D = Down
 * Based on the selected command, will return its handler function
 */

const moving = {
    'R': moveRight,
    'UR': moveUpRight,
    'U': moveUp,
    'UL': moveUpLeft,
    'L':  moveLeft,
    'DL': moveDownLeft,
    'D': moveDown,
    'DR':moveDownRight
}

const [startingPosition, endingPosition, blockedMove] = values.slice(1);

const startingItem = {...items[startingPosition]}; // just a copy
const endingItem = {...items[endingPosition]}; // just a copy

blockMove(blockedMove);

let seconds = 0;
let moves = [];

while(true) {
    if (startingItem.letter < endingItem.letter) {
        if (startingItem.index < endingItem.index) {
            moving.DR(startingItem, endingItem);
            
        } else if (startingItem.index > endingItem.index) {
            moving.DL(startingItem, endingItem);
            
        } else {
            moving.D(startingItem, endingItem);
        }
    } else if (startingItem.letter == endingItem.letter) {
        if (startingItem.index < endingItem.index) {
            moving.R(startingItem, endingItem);
           
        } else if (startingItem.index > endingItem.index) {
            moving.L(startingItem, endingItem);
         
        }
    } else if (startingItem.letter > endingItem.letter) {
        if (startingItem.index < endingItem.index) {
            moving.UR(startingItem, endingItem);
            
        } else if (startingItem.index > endingItem.index) {
            moving.UL(startingItem, endingItem);
            
        } else {
            moving.U(startingItem, endingItem);
        }
    }

    if (startingItem.letter === endingItem.letter && startingItem.index === endingItem.index) {
        break;
    }
}





console.log(moves)
console.log(seconds)

/**
 * Block the robot move. Try to have the same output of a move but with multiple moves.
 * For example, if you have to move right, you can move it DownRight and Up or UpRight and Down.
 * This function will override the normal move.
 * 
 * Optimisations had to be considered.
 * If you have to move to right twice:
 * instead of moving DownRight and Up twice (which will lead to 4 moves),
 * you can move for example DownRight and UpRight (Which will lead to only 2 moves
 * 
 * )
 * @param {*} blockedMove as describe in the problem 
 */
function blockMove(blockedMove) {
    switch(Number.parseInt(blockedMove)) {
        case 0: {
            moving.R = overrideMoveRight()
            break;
        }
        case 1: {
            moving.UR = overrideUpRight();
            break;
        }
        case 2: {
            moving.U = overrideUp();
            break;
        }
        case 3: {
            moving.UL = overrideUpLeft();
            break;
        }
        case 4: {
            moving.L = overrideMoveLeft();
            break;
        }
        case 5: {
            moving.DL = overrideDownLeft();
            break;
        }
        case 6: {
            moving.D = overrideDown();
            break;
        }
        case 7: {
            moving.DR = overrideDownRight();
            break;
        }
        
    }
}

function overrideMoveRight() {
    return (startingItem, endingItem) => {
        if (startingItem.letter === 'A') {
            if (startingItem.index + 1 < endingItem.index) {
                moveDownRight(startingItem);
                moveUpRight(startingItem);
            } else {
                moveDownRight(startingItem);
                moveUp(startingItem);
            }
        } else if (startingItem.index + 1 < endingItem.index) {
            moveUpRight(startingItem);
            moveDownRight(startingItem);
        } else {
            moveUpRight(startingItem);
            moveDown(startingItem);
        }   
    }
}

function overrideUpRight() {
    return (startingItem, endingItem) => {
        moveUp(startingItem);
        moveRight(startingItem);
    }
}

function overrideUp() {
    return (startingItem, endingItem) => {
        if (startingItem.index === 1) {
            if (previousChar(startingItem.letter) > endingItem.letter) {
                moveUpRight(startingItem);
                moveUpLeft(startingItem);
            } else {
                moveUpRight(startingItem);
                moveLeft(startingItem);
            }
        } else if (previousChar(startingItem.letter) > endingItem.letter) {
            moveUpLeft(startingItem);
            moveUpRight(startingItem);
        } else {
            moveUpLeft(startingItem);
            moveRight(startingItem);
        }   
    }
}

function overrideUpLeft() {
    return (startingItem, endingItem) => {
        moveUp(startingItem);
        moveLeft(startingItem);
           
    }
}

function overrideMoveLeft() {
    return (startingItem, endingItem) => {
        if (startingItem.letter === 'A') {
            if (startingItem.index - 1 > endingItem.index) {
                moveDownLeft(startingItem);
                moveUpLeft(startingItem);
            } else {
                moveDownLeft(startingItem);
                moveUp(startingItem);
            }
        } else if (startingItem.index - 1 > endingItem.index) {
            moveUpLeft(startingItem);
            moveDownLeft(startingItem);
        }else {
            moveUpLeft(startingItem);
            moveDown(startingItem);
        }   
    }
}

function overrideDownLeft() {
    return (startingItem, endingItem) => {
        moveDown(startingItem);
        moveLeft(startingItem);
    }
}

function overrideDown() {
    return (startingItem, endingItem) => {
        if (startingItem.index === 1) {
            if (nextChar(startingItem.letter) < endingItem.letter){ 
                moveDownRight(startingItem);
                moveDownLeft(startingItem);
            } else {
                moveDownRight(startingItem);
                moveLeft(startingItem);
            }
        } else if (nextChar(startingItem.letter) < endingItem.letter){ 
            moveDownLeft(startingItem);
            moveDownRight(startingItem);
        } else {
            moveDownLeft(startingItem);
            moveRight(startingItem);
        }  
    }
}


function overrideDownRight() {
    return (startingItem, endingItem) => {
        moveDown(startingItem);
        moveRight(startingItem);
    }
}

function recordMoves(startingItem) {
    moves.push(`${startingItem.letter}${startingItem.index}`);
    seconds++;
}

function moveDownRight(startingItem) {
    const newLetter = nextChar(startingItem.letter);
    const newIndex = startingItem.index+1;
    startingItem.letter = newLetter;
    startingItem.index = newIndex;
    recordMoves(startingItem)
}

function moveDownLeft(startingItem) {
    const newLetter = nextChar(startingItem.letter);
    const newIndex = startingItem.index-1;
    startingItem.letter = newLetter;
    startingItem.index = newIndex;
    recordMoves(startingItem)
}

function moveDown(startingItem) {
    const newLetter = nextChar(startingItem.letter);
    startingItem.letter = newLetter;
    recordMoves(startingItem)
}

function moveRight(startingItem) {
    const newIndex = startingItem.index+1;
    startingItem.index = newIndex;
    recordMoves(startingItem)
}

function moveLeft(startingItem) {
    const newIndex = startingItem.index-1;
    startingItem.index = newIndex;
    recordMoves(startingItem)
}

function moveUp(startingItem) {
    const newLetter = previousChar(startingItem.letter);
    startingItem.letter = newLetter;
    recordMoves(startingItem)
}

function moveUpRight(startingItem) {
    const newLetter = previousChar(startingItem.letter);
    const newIndex = startingItem.index+1;
    startingItem.letter = newLetter;
    startingItem.index = newIndex;
    recordMoves(startingItem)
}

function moveUpLeft(startingItem) {
    const newLetter = previousChar(startingItem.letter);
    const newIndex = startingItem.index-1;
    startingItem.letter = newLetter;
    startingItem.index = newIndex;
    recordMoves(startingItem)
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function previousChar(c) {
    return String.fromCharCode(c.charCodeAt(0) - 1);
}
