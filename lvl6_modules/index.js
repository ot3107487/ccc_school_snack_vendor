const { buildDataFromInput, buildInput, plotTraceResult } = require('./io');
const { blockMove } = require('./move-override');
const { move, getTraceResult, setInitalTrace } = require('./move');
const {
    isDirection0,
    isDirection1,
    isDirection2,
    isDirection3,
    isDirection4,
    isDirection5,
    isDirection6,
    isDirection7,
    isSame
} = require('./state');

const interactive = process.argv[2] === '-i'; 

async function main() {
    await buildInput(interactive);
    const {startingItem, endingItem, blockedMove} = buildDataFromInput();
    setInitalTrace(startingItem, endingItem, blockedMove);
    blockMove(blockedMove);

    /*
    * Directions:
    * 0 - Right
    * 1 - Up-Right
    * 2 - Up
    * 3 - Up-Left
    * 4 - Left
    * 5 - Down-Left
    * 6 - Down
    * 7 - Down-Right
    */
    while(true) {
        if (isSame(startingItem, endingItem)) {
            break;
        } else if (isDirection0(startingItem, endingItem)) {
            move.left(startingItem, endingItem);
        } else if (isDirection1(startingItem, endingItem)) {
            move.downLeft(startingItem, endingItem)
        } else if (isDirection2(startingItem, endingItem)) {
            move.down(startingItem, endingItem)
        } else if (isDirection3(startingItem, endingItem)) {
            move.downRight(startingItem, endingItem)
        } else if (isDirection4(startingItem, endingItem)) {
            move.right(startingItem, endingItem)
        } else if (isDirection5(startingItem, endingItem)) {
            move.upRight(startingItem, endingItem)
        } else if (isDirection6(startingItem, endingItem)) {
            move.up(startingItem, endingItem)
        } else if (isDirection7(startingItem, endingItem)) {
            move.upLeft(startingItem, endingItem)
        }
    }
    plotTraceResult(getTraceResult());
}
main().then(() => process.exit(0));