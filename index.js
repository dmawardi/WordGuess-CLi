var Word = require('./word');
var inquirer = require('inquirer');
var word = new Word('Break');

var guessesRemaining = 12;


// Make sure character guess is a one letter character and not a number (passed to inquirer)
function validateCharacterGuess(guess) {
    if (guess.length == 1 && isNaN(guess)) {
        return true
    } else {
        return "Sorry! That's not an appropriate guess"
    }
}

function takeCharacterGuess() {
    return inquirer
    .prompt([
      /* Pass your questions in here */
      {
          type: 'input',
          message: 'Guess a Letter: ',
          name: 'guessCharacter',
          validate: validateCharacterGuess
      }
    ])
    .then(function(answers) {
      // check user input against word and display result
      word.checkGuessAgainstWord(answers.guessCharacter);
  
      // If all letters haven't been guessed and guesses remaining are greater than 0
      if (!allLettersGuessedCheck(word) && guessesRemaining > 0) {
          // Prompt for guess again
          takeCharacterGuess();
      } else {
          if (allLettersGuessedCheck) {
              console.log('You have won! Congratulations!')
          } else {
              console.log('You have lost! Better luck next time!')
          }
      }
  
    });
}
function allLettersGuessedCheck(word) {
    // for (let i = 0; i < word.length; i++) {
        // If the number of letters already guessed are less than word length
        if (word.lettersAlreadyGuessed < word.guessWord.length) {
            console.log("User hasn't guessed all letters ");
            return false
        }
        console.log('done with check')
    // }
    // If loop completes without an unguessed letter
    return true
}

takeCharacterGuess();
