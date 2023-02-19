/**
 * @param {*} startingItem current position of the robot 
 * @param {*} endingItem desired position
 * @returns true if the startingItem is Right relative to endingItem 
 */
function isDirection0(startingItem, endingItem) {
    return isSameRow(startingItem, endingItem) && isRight(startingItem, endingItem);
}

/**
 * @param {*} startingItem current position of the robot 
 * @param {*} endingItem desired position
 * @returns true if the startingItem is Up-Right relative to endingItem 
 */
function isDirection1(startingItem, endingItem) {
    return isUp(startingItem, endingItem) && isRight(startingItem, endingItem);
}

/**
 * @param {*} startingItem current position of the robot 
 * @param {*} endingItem desired position
 * @returns true if the startingItem is Up-SameColumn relative to endingItem 
 */
function isDirection2(startingItem, endingItem) {
    return isUp(startingItem, endingItem) && isSameColumn(startingItem, endingItem);
}

/**
 * @param {*} startingItem current position of the robot 
 * @param {*} endingItem desired position
 * @returns true if the startingItem is Up-Left relative to endingItem 
 */
function isDirection3(startingItem, endingItem) {
    return isUp(startingItem, endingItem) && isLeft(startingItem, endingItem);
}

/**
 * @param {*} startingItem current position of the robot 
 * @param {*} endingItem desired position
 * @returns true if the startingItem is Left-SameRow relative to endingItem 
 */
function isDirection4(startingItem, endingItem) {
    return isSameRow(startingItem, endingItem) && isLeft(startingItem, endingItem);
}

/**
 * @param {*} startingItem current position of the robot 
 * @param {*} endingItem desired position
 * @returns true if the startingItem is Down-Left relative to endingItem 
 */
function isDirection5(startingItem, endingItem) {
    return isDown(startingItem, endingItem) && isLeft(startingItem, endingItem);
}

/**
 * @param {*} startingItem current position of the robot 
 * @param {*} endingItem desired position
 * @returns true if the startingItem is Down-SameColumn relative to endingItem 
 */
function isDirection6(startingItem, endingItem) {
    return isSameColumn(startingItem, endingItem) && isDown(startingItem, endingItem);
}

/**
 * @param {*} startingItem current position of the robot 
 * @param {*} endingItem desired position
 * @returns true if the startingItem is Down-Right relative to endingItem 
 */
function isDirection7(startingItem, endingItem) {
    return isRight(startingItem, endingItem) && isDown(startingItem, endingItem);
}

/**
 * @param {*} startingItem current position of the robot 
 * @param {*} endingItem desired position
 * @returns true if the robort reached the desired position 
 */
function isSame(startingItem, endingItem) {
    return startingItem.letter === endingItem.letter && startingItem.index === endingItem.index;
}

// single axis state functions
function isUp(startingItem, endingItem) {
    return startingItem.letter < endingItem.letter;
}

function isDown(startingItem, endingItem) {
    return startingItem.letter > endingItem.letter;
}

function isLeft(startingItem, endingItem) {
    return startingItem.index < endingItem.index;
}

function isRight(startingItem, endingItem) {
    return startingItem.index > endingItem.index;
}

function isSameRow(startingItem, endingItem) {
    return startingItem.letter === endingItem.letter;
}

function isSameColumn(startingItem, endingItem) {
    return startingItem.index === endingItem.index;
}


module.exports = {
    isSame,
    isDirection0,
    isDirection1,
    isDirection2,
    isDirection3,
    isDirection4,
    isDirection5,
    isDirection6,
    isDirection7
}