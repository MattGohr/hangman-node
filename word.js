var Letter = require('./letter');

function Word(word) {
  this.word = word;

  this.letterArray = [];

  //build letter array
  for (var i = 0; i < this.word.length; i++) {
    var letter = new Letter(word[i]);
    this.letterArray.push(letter);
  }

  this.compare = function(other) {
    for (var i = 0; i < this.letterArray.length; i++) {
      var letter = this.letterArray[i];
      letter.compare(other);
    }
  }

  this.renderWord = function() {
    var letters = [];
    for (var i = 0; i < this.letterArray.length; i++) {
        var letter = this.letterArray[i];
        letters.push(letter.renderLetter())
    }

    return letters.join(' ');
}
  this.isVisible = function () {
    var visible = true;
    for (var i = 0; i < this.letterArray.length; i++) {
        var letter = this.letterArray[i];
        // console.log(`${letter.renderLetter()}`);
        if (letter.renderLetter() === '_') {
          var visible = false;
        }
    }
    return visible;
  }
}

module.exports = Word;
