var inquirer = require('inquirer');

var prompt = inquirer.createPromptModule();


//create player array: you can add as many words to the list as you want.
var words = ["dhalsim", "ryu", "guile", "akuma", "sagat"];

//wins
//random word in array index
var randWord = Math.floor(Math.random() * words.length) + 0;
// var randWord = 3;

//hangman view word
var hangManViewWord = [];

//guesses variable
var guessLeft = 15;

//incorrect guesses
var incorrectLetters = "",
  correctLetters = "",
  letterBank = "";

//wins
var wins = 0;

//hide hangman word
function hideHangman() {

  hangManViewWord = [];

  //add same number of dahses as there are words
  for (var i = 0; i < words[randWord].length; i++) {

    //load dashes
    hangManViewWord[i] = "_ ";

  }

  console.log(combineArraySameLine(hangManViewWord));

}

//comnine elements on the same line
function combineArraySameLine(arg1) {

  var complete = ""

  //loop through each index and print to
  for (var i = 0; i < arg1.length; i++) {

    complete = complete + arg1[i];

  }
  return complete;

}

//rewrite hangeman
function reWriteHangMan(letterGuessed) {

  //check to see if nothing is passed in
  if (typeof letterGuessed !== "undefined") {

    //search for letter index in original word
    var x = hangManViewWord.indexOf(letterGuessed + " ");

    if (x >= 0) {
      //skip
    } else {

      var placeholderWord = words[randWord]

      //loop through indexes and fill in all instances of correct letter
      for (var i = 0; i < placeholderWord.length; i++) {
        if (letterGuessed === placeholderWord[i]) {

          //replace
          hangManViewWord[i] = letterGuessed + " ";

          //add to bank
          correctLetters = correctLetters + letterGuessed;
        }
      }
    }
  }
}

//load hangman "_"
hideHangman();

//WHEN KEY IS PRESSED -------------------------------------------------------------------
function askUser() {
  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "Guess a letter:",
        name: "letter"
      },
    ]).then(function(response) {

      // Captures the key press, converts it to lowercase, and saves it to a variable.
      var letter = response.letter.toLowerCase();
      console.log("letter is: " + letter);

      var findLetter = words[randWord].toLowerCase().search(letter);

      var wrongLetterCheck = letterBank.toLowerCase().search(letter);

      if (wrongLetterCheck >= 0) {
        //skip
      } else {

        //check to see if true
        if (findLetter >= 0) {

          //add to hidden hangman word
          reWriteHangMan(letter);

          //print new hangman array
          console.log(combineArraySameLine(hangManViewWord));

        }

        //if incorrect
        if (findLetter < 0) {

          //log incorrect letters
          incorrectLetters = incorrectLetters + letter;
          letterBank = letterBank + letter;

          //display incorrect letters guessed
          console.log('incorrect letters: ' + combineArraySameLine(incorrectLetters));

          //decrease letters guessed
          guessLeft = guessLeft - 1;

          //print guesses left
          console.log('guesses left: ' + guessLeft);

        }
      }


      askUser()
      //Win
      if (correctLetters.length === words[randWord].length) {

        //add wins
        wins++

        //log win
        var winCountDiv = document.getElementById("wins");
        winCountDiv.innerHTML = wins;

        //restart hangman
        hangeManDiv.innerHTML = "";
        randWord = Math.floor(Math.random() * words.length) + 0;
        hideHangman();

        //new word
        hangeManDiv.innerHTML = combineArraySameLine(hangManViewWord);

        //set letters to ""
        correctLetters = "", incorrectLetters = "", letterBank = "";

        //reset guesses
        guessLeft = 15;
        guessCountDiv.innerHTML = guessLeft;

        correctGuessDiv.innerHTML = "_";


      }

      //if loss
      if (guessLeft === 0) {

        //restart
        randWord = Math.floor(Math.random() * words.length) + 0;
        hangeManDiv.innerHTML = "";
        hideHangman();

        //new word
        hangeManDiv.innerHTML = combineArraySameLine(hangManViewWord);

        //set letters to ""
        correctLetters = "", incorrectLetters = "", letterBank = "";

        //reset letters guessed
        guessLeft = 15;
        guessCountDiv.innerHTML = guessLeft;

        correctGuessDiv.innerHTML = "_";
      }

      console.log(words[randWord])

    });
}

askUser()
