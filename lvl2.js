const input = '919 88 20 5 1 20 50 20 1 2 10 2 200 200 5 2 1 200 20 200 100 2 1 1 5 2 20 1 2 2 20 1 50 100 100 10 1 5 50 50 10 20 10 100 200 5 10 5 50 200 1 2 50 10 50 20 2 5 20 1 5 20 20 10 10 50 20 100 2 1 10 200 50 1 1 200 20 2 50 100 20 10 200 20 10 100 20 20 1 20';

// split the input by " " and parse each number as integer
const values = input.split(' ').map(n => Number.parseInt(n));
const price = values[0];

// compute the amount of money inserted

const deposits = values.slice(1 + 1 /**price and number of deposits */)
    .reduce((acc, current) => acc + current, 0);

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
