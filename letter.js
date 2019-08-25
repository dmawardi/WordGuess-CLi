var Letter = function(characterValue){
    this.characterValue = characterValue;
    this.userHasGuessed = false;
}

// function that returns underlying character if the letter has been guessed or underscore if not
Letter.prototype.toString = function() {
    // If user has guessed this character
    if (this.userHasGuessed) {
        // reveal the character
        return this.characterValue

        // Else, return underscore
    } else {
        return '_'
    }
}

// Function that takes guess argument and checks it 
Letter.prototype.checkGuessAgainstLetter = function(guess) {
    // If the value is equal to the guess
    if (this.characterValue.toLowerCase() == guess.toLowerCase()) {
        // Set Letter's user guessed boolean to true
        this.userHasGuessed = true;
        // Return true
        return true
        // Else, return false
    } else {
        return false
    }
}

module.exports = Letter;