var Word = require('./word');
var inquirer = require('inquirer');

var prompt = inquirer.createPromptModule();

//connents

//create player array: you can add as many words to the list as you want.
var words = ["dhalsim", "ryu", "guile", "akuma", "sagat"];
var word = new Word(words[Math.floor(Math.random() * words.length) + 0]);
var guessLeft = 15;
var incorrectLetters = "",
  correctLetters = "",
  letterBank = "";
var wins = 0,
  losses = 0;

function finder(searchingFor, searchingIn) {
  var checker = searchingFor.indexOf(searchingIn);
  // console.log(`Seaarching for ${searchingFor} in ${searchingFor}`);
  if (checker === -1) {
    return false;
  } else {
    return true;
  }
}

//questions and logic  -------------------------------------------------------------------
function askUser() {
  inquirer.prompt([{
    type: "input",
    message: "Guess a letter:",
    name: "letter"
  }, ]).then(function(response) {


    // Captures the key press, converts it to lowercase, and saves it to a variable.
    var letter = response.letter.toLowerCase();
    var previouslyChoosen = finder(letterBank, letter);
    var foundLetter = finder(word.word, letter);

    // // console.log(`letterBank: ${letterBank}`);
    // console.log(`letterBankCheck: ${letterBankCheck}`);
    // console.log(`findLetter: ${findLetter}`);

    if (previouslyChoosen === false) {

      if (foundLetter === true) {

        correctLetters = correctLetters + letter;
        letterBank = letterBank + letter;

        //add to hidden hangman word
        word.compare(letter);

      }

      if (foundLetter === false) {

        incorrectLetters = incorrectLetters + letter;
        letterBank = letterBank + letter;
        guessLeft = guessLeft - 1;

        console.log('incorrect letters: ' + incorrectLetters);
        console.log('guesses left: ' + guessLeft);

      }
    }

    console.log(` correct letter len: ${correctLetters.length}\n word len: ${word.word.length}`);
    //Win
    //search for _ to see if word is hidden.
    if (correctLetters.length === word.word.length) {

      //add wins
      wins++
      console.log(`Congrats you've wone!`);
      console.log(`wins: ${wins}`);
      console.log(`losses: ${losses}`);

    }

    //if loss
    if (guessLeft === 0) {

      losses++
      console.log(`Congrats You've Lost! \nBetter Luck Next Time!`);
      console.log(`wins: ${wins}`);
      console.log(`losses: ${losses}`);

    }
    console.log(word.renderWord());
    askUser();


  });
}
askUser();
