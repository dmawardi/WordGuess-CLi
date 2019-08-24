var Letter = require('./letter.js');

var Word = function(guessWord) {
    // Construct variables
    this.guessWord = guessWord;
    this.lettersAlreadyGuessed = 0;
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
    var numberOfLettersAlreadyRevealed = 0;
    for (let i = 0; i < this.wordArray.length; i++) {
        // Add the character to the string (this is determined by the boolean value)
        guessWordCurrentState += this.wordArray[i].toString();
        // If the letter has already been revealed, add to the counter
        if (this.wordArray[i].userHasGuessed) {
            numberOfLettersAlreadyRevealed++;
        }
    }
    // Update word property with counts of letters already revealed
    this.lettersAlreadyGuessed = numberOfLettersAlreadyRevealed;
    // Return string for printing
    return guessWordCurrentState
};

// Function that checks guess against all letters in word
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


