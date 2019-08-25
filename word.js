var Letter = require('./letter.js');

var Word = function(guessWord) {
    // Construct variables
    this.guessWord = guessWord;
    this.lettersAlreadyGuessed = 0;
    // Declare wordArray and construct using function createWordArray (from prototype)
    this.wordArray = [];
    this.guessesRemaining = 12;
    // createWord array and assign to wordArray variable
    this.createWordArray(this.guessWord);
}

// Create a word array from the input word
Word.prototype.createWordArray = function() {
    // Iterate through guessword
    for (let i = 0; i < this.guessWord.length; i++) {
        // Assign letter at current index to variable
        let letterAtCurrentIndex = this.guessWord[i];
        // Use current letter to create new letter object
        let letter = new Letter(letterAtCurrentIndex);
        // Push letter object to array
        this.wordArray.push(letter);
    }
}

// Prints out the current state of letters (guessed and unguessed)
Word.prototype.returnGuessWordCurrentState = function() {
    // Initialize empty string for string concatenation
    var guessWordCurrentState = ''
    // Initialize variable for counting revealed letters
    var numberOfLettersAlreadyRevealed = 0;

    // Iterate through wordarray
    for (let i = 0; i < this.wordArray.length; i++) {
        // Add the character to the string (this is determined by the boolean value)
        guessWordCurrentState += this.wordArray[i].toString();
        // If the letter has already been revealed, add to the counter
        if (this.wordArray[i].userHasGuessed) {
            // Increase the counter for revealed letters
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
    // Initiate counter for letters guessed correct from this particular guess
    let lettersCheckedCorrect = 0;
    // Iterate through word array
    for (let i = 0; i < this.wordArray.length; i++) {
        // Check result of guess against letter, set return value to result
        let result = this.wordArray[i].checkGuessAgainstLetter(charGuess);
        // If the character guess returned a correct result
        if (result) {
            // Increment lettersCheckedCorrect
            lettersCheckedCorrect++;
        } 
    }

    // Output message depending on user's result
    if (lettersCheckedCorrect > 0) {
        // Display number of correct letters 
        console.log('You have guessed Correct ' + lettersCheckedCorrect + ' of the letters!');
    } else {
        // Reduce guesses remaining from word and display to user
        this.guessesRemaining--;
        console.log("Sorry! That letter is not in this word\nGuesses Remaining: "+this.guessesRemaining);
    }

    // Log current state of word guess
    console.log(this.returnGuessWordCurrentState());
};

// Export
module.exports = Word;