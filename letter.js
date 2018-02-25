function Letter(letter) {
  this.letter = letter;
  this.hidden = true;

  this.compare = function(other) {
    if (this.letter.toUpperCase() === other.toUpperCase()) {
      this.hidden = false;
    }
  }

  this.renderLetter = function() {
    if (this.hidden) return '_';
    else return this.letter;
  }
}

module.exports = Letter;
