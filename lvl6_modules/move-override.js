const {
    moveDown,
    moveDownLeft,
    moveDownRight,
    moveLeft,
    moveRight,
    moveUp,
    moveUpLeft,
    moveUpRight,
    move
} = require('./move');

const {
    nextChar,
    previousChar
} = require('./utils');

function overrideRight() {
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

function overrideLeft() {
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

/**
 * Block the robot move. Try to have the same output of a move but with multiple moves.
 * For example, if you have to move right, you can move it DownRight and Up or UpRight and Down.
 * This function will override the normal move.
 * 
 * Optimisations had to be considered.
 * If you have to move to right twice:
 * instead of moving DownRight and Up twice (which will lead to 4 moves),
 * you can move for example DownRight and UpRight (which will lead to only 2 moves)
 * @param {*} blockedMove as describe in the problem 
 */
function blockMove(blockedMove) {
    switch(Number.parseInt(blockedMove)) {
        case 0: {
            move.right = overrideRight()
            break;
        }
        case 1: {
            move.upRight = overrideUpRight();
            break;
        }
        case 2: {
            move.up = overrideUp();
            break;
        }
        case 3: {
            move.upLeft = overrideUpLeft();
            break;
        }
        case 4: {
            move.left = overrideLeft();
            break;
        }
        case 5: {
            move.downLeft = overrideDownLeft();
            break;
        }
        case 6: {
            move.down = overrideDown();
            break;
        }
        case 7: {
            move.downRight = overrideDownRight();
            break;
        }
        
    }
}

module.exports = {
    blockMove
}