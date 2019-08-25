var Word = require('./word');
var inquirer = require('inquirer');
var fs = require('fs');
// Initialize movie database and word variables
var movieDB = [];
var word;

// Function List
// 
// Function that reads file then runs callback function
function readFileThen(callback) {
    // Read movie database file
    fs.readFile('./moviedb.txt', 'utf8', function (err, data) {
        // if error, reject with it
        if (err) throw reject(error);
        // split the movie list by commas (csv)
        movieDB = data.split(',');
        // generate word
        word = new Word(selectRandomWordFrom(movieDB));
        // Diplay welcome message
        console.log('\nWelcome to Movie Guesser! \n A movie will be randomly selected for you to guess!');
        console.log('Guess the ' + word.guessWord.length + ' letter word');
        console.log(word.returnGuessWordCurrentState());

        // Run callback function
        callback();
    });

}

// Selects a random item from an array
function selectRandomWordFrom(array) {
    // Generate random number between 0 and array length and return
    let randomNumber = Math.round(Math.random() * array.length);
    return array[randomNumber];
}

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
        .then(function (answers) {
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
readFileThen(function () {
    takeCharacterGuess();
});