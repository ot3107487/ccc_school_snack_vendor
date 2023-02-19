function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function previousChar(c) {
    return String.fromCharCode(c.charCodeAt(0) - 1);
}

module.exports = {
    nextChar,
    previousChar
}