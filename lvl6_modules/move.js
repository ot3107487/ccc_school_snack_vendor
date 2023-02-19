const {
    nextChar,
    previousChar
} = require('./utils');

const state = {
    moves: [],
    seconds: 0
}

function recordMoves(startingItem) {
    state.moves.push({...startingItem});
    state.seconds++;
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

function getTraceResult() {
    return {...state};
}

function setInitalTrace(startingItem, endingItem, blockedMove) {
    state.startingItem = {...startingItem};
    state.endingItem = {...endingItem};
    state.blockedMove = blockedMove;
}

const move = {
    right: moveRight,
    upRight: moveUpRight,
    up: moveUp,
    upLeft: moveUpLeft,
    left: moveLeft,
    downLeft: moveDownLeft,
    down: moveDown,
    downRight: moveDownRight
}

module.exports = {
    moveDown,
    moveDownLeft,
    moveDownRight,
    moveLeft,
    moveRight,
    moveUp,
    moveUpLeft,
    moveUpRight,
    move,
    getTraceResult,
    setInitalTrace
}