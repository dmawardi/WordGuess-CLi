var Letter = require('./letter.js');

var Word = function(guessWord) {
    // Construct variables
    this.guessWord = guessWord;
    // Declare wordArray and construct using function createWordArray (from prototype)
    this.wordArray = [];
    this.createWordArray(this.guessWord);
}

Word.prototype.createWordArray = function() {
    for (let i = 0; i < this.guessWord.length; i++) {

        let letterAtCurrentIndex = this.guessWord[i];
        // Use current letter to create new letter object
        let letter = new Letter(letterAtCurrentIndex);
        // Push letter object to array
        this.wordArray.push(letter);
    }
}

Word.prototype.returnGuessWordCurrentState = function() {
    var guessWordCurrentState = ''
    for (let i = 0; i < this.wordArray.length; i++) {
        guessWordCurrentState += this.wordArray[i].toString();
    }
    return guessWordCurrentState
};

Word.prototype.checkGuessAgainstWord = function(charGuess){
    for (let i = 0; i < this.wordArray.length; i++) {
        this.wordArray[i].checkGuessAgainstLetter(charGuess);
    }
    console.log(this.returnGuessWordCurrentState());
};

module.exports = Word;

var word = new Word('Hallelujah');


console.log(word.guessWord);
word.checkGuessAgainstWord('h');


