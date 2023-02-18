const input = 'O12 3577 4269 4082 3042 2126 2174 1828 1482 1238 2290 186 4243 4170 231 3374 3400 2886 4271 4487 3326 4770 663 1598 3190 3574 3820 1816 3305 4414 445 3620 2605 1015 2735 4052 4293 2313 3494 245 3343 4427 1511 1477 3676 1831 1359 1234 1067 3763 3655 3975 3864 1073 1524 564 3916 329 3929 1802 3476 4967 572 1315 3144 3913 4533 3146 2330 4124 2138 1861 2243 4345 2334 122 323 4653 3125 464 4243 4885 664 3347 30 3875 1772 1415 4810 4813 4443 4564 3355 543 4828 183 104 262 3776 207 2118 3585 2656 2345 232 1837 620 4163 1417 1929 3287 2409 3362 1558 2585 1263 1406 35 171 732 1559 3906 214 1637 996 988 2374 3115 4812 1593 1246 1945 757 885 491 915 4177 4612 457 771 563 2871 4097 740 4330 772 4150 138 1816 2541 3335 2048 930 2328 3763 3127 1379 2150 2542 277 4676 4773 4515 747 2989 77 3804 3599 2311 573 2732 4831 1329 2854 2708 379 1136 1020 3985 3038 2108 N3 46 20 5 50 200 10 1 200 1 5 10 50 2 10 10 10 20 2 20 5 2 20 2 200 1 5 5 20 2 1 100 1 20 200 200 1 200 200 10 50 50 10 20 20 5 1 10';


const values = input.split(' ');

/**
 * based on the last item, you need  to build the matrix of the items.
 * The letter (A-Z) will give you the number of rows
 * The index (1-26) will give you the number of columns.
 */

const lastItem = values[0];
const maxLetter = lastItem[0];
const maxNumber = Number.parseInt(lastItem.slice(1));

const items = {}; // the matrix (flattened) stored as a map

let currentPosition = 1;
for (let letter = 'A'; letter <= maxLetter; letter=nextChar(letter)) {
    for (let index = 1; index <= maxNumber; index++) {
        const item = {
            price: Number.parseInt(values[currentPosition]),
            position: `${letter}${index}`
        };
        items[item.position] = item;
        currentPosition++;
    }
}

// selected item to purchase
const selectedItem = values[currentPosition];
currentPosition++;

const { price } = items[selectedItem]; // price of the selected item

const deposits = values.slice(currentPosition+1)
        .reduce((acc, current) => acc + Number.parseInt(current), 0);

const diff = Math.abs(deposits - price);
if (deposits > price) {
    console.log(`CHANGE ${computeChange(diff)}`);
} else {
    console.log(`MISSING ${diff}`)

}

/**
 * Compute the change that the vending machine has to give back.
 * Possible money values are 1, 2, 5, 10, 20, 50, 100 and 200.  
 * @param {*} value of the change
 * @returns a string representing how many bills/coins of each value the machine has to return
 */

function computeChange(value) {
    /**
     * the algorithm will try to compute the frequency of each value in a greedy manner
     * Given a value, it will compute the minimum amount of bills necessary.
     */
    const coins = [1, 2, 5, 10, 20, 50, 100, 200];
    coins.sort((a,b) => b-a); // sort descending
    const coinsFreq = {}; // auxiliary map that will track the frequency of each value
    coins.forEach((c, index) => {
        coinsFreq[index] = {c, freq: 0}; 
    })
    while (value != 0) {
        for (let i = 0; i< coins.length; i++) {
            const coinValue = coins[i];
            if (coinValue <= value) {
                const freq = Number.parseInt(value/coinValue);
                coinsFreq[i].freq = freq;;
                value -= freq*coinValue;
            }
        }
    }
    return Object.values(coinsFreq).sort((a,b) => a.c - b.c).map(v => v.freq).join(' ');
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
