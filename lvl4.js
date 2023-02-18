const input = 'K26 676 738 585 378 185 597 203 350 902 681 70 947 998 928 345 394 964 9 799 983 993 179 634 484 461 218 942 875 164 949 836 634 177 205 335 513 743 460 155 206 419 696 526 655 886 144 343 340 261 981 410 555 372 894 498 880 67 209 257 211 958 711 36 245 993 142 687 613 175 655 384 68 136 365 454 567 94 255 100 85 499 868 735 763 352 843 697 869 56 728 892 421 113 337 535 471 766 398 221 187 29 798 738 697 33 66 960 40 607 628 256 250 943 356 719 150 990 104 255 759 594 305 451 385 100 145 372 698 295 740 582 805 778 44 776 622 265 58 677 579 514 637 156 711 954 192 406 283 899 674 222 193 531 369 127 345 220 130 21 342 597 434 36 724 736 579 402 240 708 108 188 151 881 875 325 755 208 931 760 632 84 222 12 162 769 366 180 141 822 976 582 51 411 819 428 116 562 909 829 911 665 67 106 394 853 568 992 817 843 818 543 171 723 915 522 573 707 903 939 271 471 257 988 807 368 266 887 811 428 327 323 937 383 34 466 210 34 500 767 470 993 802 347 800 366 868 642 837 376 755 837 722 978 457 410 386 137 814 510 26 674 858 457 259 970 353 481 381 932 713 600 776 656 479 621 838 157 546 833 769 553 36 663 693 359 376 1 9 4 2 9 9 4 5 4 5 8 6 4 4 6 8 7 7 2 8 6 4 9 6 4 5 6 7 2 6 3 7 3 8 1 3 2 3 2 2 3 9 9 1 1 4 2 6 8 6 6 1 9 4 2 3 6 4 6 6 5 8 3 2 6 2 5 6 3 2 9 2 6 8 6 1 1 6 6 7 8 2 1 7 5 1 9 5 1 4 3 7 4 6 4 9 6 7 2 3 3 7 5 1 2 3 6 7 4 5 2 3 1 3 9 6 7 2 1 3 7 6 4 9 5 6 8 2 8 8 5 7 8 2 3 5 1 9 7 3 1 7 2 6 1 1 7 2 9 8 4 8 6 5 8 8 2 9 2 9 8 7 3 2 4 1 3 8 7 6 6 3 1 2 6 6 2 1 6 7 8 4 1 4 9 5 4 9 3 3 1 2 8 2 5 9 6 7 8 2 9 3 3 6 4 3 8 6 1 9 9 1 4 1 2 6 9 7 5 8 6 8 8 5 6 8 5 3 5 3 7 1 1 5 8 3 9 3 6 9 5 8 1 8 3 4 7 1 7 8 4 7 5 1 1 8 9 6 3 4 2 7 5 2 2 6 2 7 7 7 9 1 4 8 5 3 6 5 9 4 3 3 5 4 4 9 92 F16 F26 B2 A5 H13 G12 D18 C16 A25 K26 C7 B18 B14 A10 G24 J14 J10 B25 E2 B21 K1 B8 D21 F16 F5 D24 C14 J17 B5 I18 E2 H21 F14 H22 I3 G10 K9 E16 E8 B15 J10 F15 F2 B20 D24 K11 C2 H23 I17 E3 J16 A16 D12 C8 H11 F25 K17 C22 K19 A18 D14 K3 F18 A18 E25 C13 H1 G12 E21 G12 F10 K13 I7 C16 C2 K22 K1 D10 A19 J24 B10 G25 I14 D14 J14 B13 I18 E21 I4 D5 J19 G16'
const values = input.split(' ');

/**
 * based on the last item, you need to build the matrix of the items.
 * The letter (A-Z) will give you the number of rows
 * The index (1-26) will give you the number of columns.
 */
const lastItem = values[0];
const maxLetter = lastItem[0];
const maxNumber = Number.parseInt(lastItem.slice(1));

const items = {};  // the matrix (flattened) stored as a map

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

/**
 * Store every item stock
 */
for (let letter = 'A'; letter <= maxLetter; letter=nextChar(letter)) {
    for (let index = 1; index <= maxNumber; index++) {
        const position = `${letter}${index}`
        const stock = Number.parseInt(values[currentPosition]);
        items[position].stock = stock;
        currentPosition++;
    }
}

const orders = values.slice(currentPosition+1); // items ordered
/**
 * Compute the revenue. 
 * If an item is out of stock add 0, else add its value and decrement its stock
 */
let revenue = 0;
orders.forEach(o => {
    if (items[o].stock > 0) {
        items[o].stock--;
        revenue+=items[o].price;
    }
})

console.log(revenue);

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
