var Word = require('./word');
var inquirer = require('inquirer');
var word = new Word('The Godfather');


// Make sure character guess is a one letter character and not a number (passed to inquirer)
function validateCharacterGuess(guess) {
    // If the length of input is not a single character and a non-number character, disallow
    if (guess.length == 1 && isNaN(guess)) {
        return true
    } else {
        return "Sorry! That's not an appropriate guess"
    }
}

// Takes a single character guess from user using Inquirer
function takeCharacterGuess() {
    inquirer
    .prompt([
      // Only one input required from user, single character non-number
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
      if (!allLettersGuessedCheck(word) && word.guessesRemaining > 0) {
          // Prompt for guess again
          takeCharacterGuess();

        //   Else if the game is over, determine if win/lose
      } else {
        //   If all letters guessed
          if (allLettersGuessedCheck(word)) {
            //   User has won
              console.log('You have won! Congratulations!');
            } else {
                //   Else if guesses remaining is at 0, User has lost
              console.log('You have lost! Better luck next time!');
          }
      }
  
    });
}

// function to quickly check if all the ltters have been checked
function allLettersGuessedCheck(word) {
        // If the number of letters already guessed are less than word length
        if (word.lettersAlreadyGuessed < word.guessWord.length) {
            return false
        }
    // If loop completes without an unguessed letter
    return true
}

// Arguments begin here
takeCharacterGuess();
