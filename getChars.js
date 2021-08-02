
function getChars(charsIndexes, password) {
    return charsIndexes.map(index => password[index - 1]);
}

module.exports = {
    getChars
}
