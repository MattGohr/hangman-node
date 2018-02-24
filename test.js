// var waitTime = 3000;
// var currentTime = 0;
// var waitInterval = 10;
// var percentWaited = 0;
//
// function writeWaitingPercent (p) {
//   process.stdout.clearLine();
//   process.stdout.cursorTo(0);
//   process.stdout.write(`waiting... ${p}%`);
// }
//
// var interval = setInterval(function() {
//   currentTime += waitInterval;
//   percentWaited = Math.floor((currentTime/waitTime) * 100);
//   writeWaitingPercent(percentWaited);
// }, waitInterval);
//
//
// setTimeout(function() {
//   clearInterval(interval);
//   writeWaitingPercent(100);
//   console.log('\n\n\ndone!\n\n\n');
// }, waitTime);
//
// process.stdout.write(`\n\n\n`);
// writeWaitingPercent(percentWaited);

// Create a basic command line Node application using the inquirer package.
// Your application should ask the user any five questions of your choosing.
// The question set should include at least one:

//    - Basic input,
//    - Password,
//    - List,
//    - Check-box,
//    - and Confirm

// Then if a user's password matches a pre-defined password, re-display the data back to the user with some text.
// See the inquirer GitHub documentation "examples" page if you need help.

// Remember to be creative!

// ========================================================================
// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Created a series of questions
function askUser () {
inquirer.prompt([

  {
    type: "input",
    name: "name",
    message: "Who are you???"
  },

  {
    type: "list",
    name: "doingWhat",
    message: "What are you doing in my house??",
    choices: ["I made you cookies!", "No lie dude. I'm here to rob you.", "Uh. This is my house... Who are YOU???"]
  },

  {
    type: "checkbox",
    name: "carryingWhat",
    message: "What are you carrying in your hands??",
    choices: ["TV", "Slice of Toast", "Butter Knife"]
  },

  {
    type: "confirm",
    name: "canLeave",
    message: "Can you leave now?"
  },

  {
    type: "password",
    name: "myPassword",
    message: "Okay fine. You can stay. But only if you say the magic password."
  }

]).then(function(user) {

  if (user.confirm) {
    console.log("so you're stuck here too, then?");
  }

  // If the user guesses the password...
  if (user.myPassword === "myHouse") {

    console.log("==============================================");
    console.log("");
    console.log("Well a deal's a deal " + user.name);
    console.log("You can stay as long as you like.");
    console.log("Just put down the " + user.carryingWhat.join(" and ") + ". It's kind of freaking me out.");
    console.log("");
    console.log("==============================================");
  }


  // If the user doesn't guess the password...
  else {

    console.log("==============================================");
    console.log("");
    console.log("Sorry " + user.name);
    console.log("I'm calling the cops!");
    console.log("");
    console.log("==============================================");

  }
});
