var Word = require('./word');
var inquirer = require('inquirer');
var guessword = 'Break'

var guessesRemaining = 12;


// Make sure character guess is a one letter character
function validateCharacterGuess(guess) {
    if (guess.length == 1 && isNaN(guess)) {
        return true
    } else {
        return "Sorry! That's not an appropriate guess"
    }
}

function takeCharacterGuess() {

}
function allLettersGuessedCheck(word) {
    for (let i = 0; i < word.length; i++) {
        // If a letter is found to not be already guessed
        if (!word[i].userHasGuessed) {
            return false
        }
    }
    // If loop completes without an unguessed letter
    return true
}

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'input',
        message: 'Guess a Letter: ',
        name: 'guessCharacter',
        validate: validateCharacterGuess()
    }
  ])
  .then(function(answers) {
    // Use user feedback for... whatever!!
    word.checkGuessAgainstWord(answers.guessCharacter);

    // If all letters haven't been guessed and guesses remaining are greater than 0
    if (!allLettersGuessedCheck && guessesRemaining > 0) {
        // Prompt for guess again
        takeCharacterGuess();
    }

  });