var Word = require('./word');
var inquirer = require('inquirer');
var clear = require('clear');

var prompt = inquirer.createPromptModule();

//
//create player array: you can add as many words to the list as you want.
var words = ["dhalsim", "ryu", "guile", "akuma", "sagat"];
var word = new Word(words[Math.floor(Math.random() * words.length) + 0]);
var guessLeft = 15;
var incorrectLetters = "",
  correctLetters = "",
  letterBank = "";
var wins = 0,
  losses = 0;
var wone = false;

function finder(searchingFor, searchingIn) {
  var checker = searchingFor.indexOf(searchingIn);
  // console.log(`Seaarching for ${searchingFor} in ${searchingFor}`);
  if (checker === -1) {
    return false;
  } else {
    return true;
  }
}

function playAgain() {
  inquirer.prompt([{
    type: "confirm",
    message: "Want to play again (the answer is yes!)",
    name: "wantToStay"
  }]).then(function(response) {

    if (response.wantToStay === true) {
      guessLeft = 15;
      incorrectLetters = "";
      correctLetters = "";
      letterBank = "";
      wone = false;
      word = new Word(words[Math.floor(Math.random() * words.length) + 0]);
      clear();
      askUser();
    }else {
      console.log(`GoodBye!!`);
    }

  })
}

//questions and logic  -------------------------------------------------------------------
function askUser() {
  inquirer.prompt([{
    type: "input",
    message: "Guess a letter:",
    name: "letter"
  }, ]).then(function(response) {
    clear();

    // Captures the key press, converts it to lowercase, and saves it to a variable.
    var letter = response.letter.toLowerCase();
    var previouslyChoosen = finder(letterBank, letter);
    var foundLetter = finder(word.word, letter);



    if (previouslyChoosen === false) {

      if (foundLetter === true) {

        correctLetters = correctLetters + letter;
        letterBank = letterBank + letter;

        word.compare(letter);

      }

      if (foundLetter === false) {

        incorrectLetters = incorrectLetters + letter;
        letterBank = letterBank + letter;
        guessLeft = guessLeft - 1;

      }
    }

    //Win
    //search for _ to see if word is hidden.
    if (word.isVisible()) {

      wins++
      console.log(`Congrats you've wone!`);
      wone = true;
    }

    //if loss
    if (guessLeft === 0) {

      losses++
      console.log(`Congrats You've Lost! \nBetter Luck Next Time!`);

    }

    console.log(`Letters guessed: ${letterBank}`);
    console.log(`Guesses left: ${guessLeft}`);
    console.log(`wins: ${wins}`);
    console.log(`losses: ${losses}`);
    console.log(word.renderWord());

    if (!wone) {
      askUser();
    } else {
      playAgain()
    }

  });
}
askUser();
