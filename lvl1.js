const input = '919 88 20 5 1 20 50 20 1 2 10 2 200 200 5 2 1 200 20 200 100 2 1 1 5 2 20 1 2 2 20 1 50 100 100 10 1 5 50 50 10 20 10 100 200 5 10 5 50 200 1 2 50 10 50 20 2 5 20 1 5 20 20 10 10 50 20 100 2 1 10 200 50 1 1 200 20 2 50 100 20 10 200 20 10 100 20 20 1 20';

// split the input by " " and parse each number as integer
const values = input.split(' ').map(n => Number.parseInt(n));
const price = values[0];

// compute the amount of money inserted

// let deposits = 0;
// values.slice(1 + 1 /**price and number of deposits */).forEach(v => {
//     deposits += v;
// })

// <=>
const deposits = values.slice(1 + 1 /**price and number of deposits */)
    .reduce((acc, current) => acc + current, 0);

const diff = Math.abs(deposits - price);
if (deposits > price) {
    console.log(`CHANGE ${diff}`);
} else {
    console.log(`MISSING ${diff}`)
}
