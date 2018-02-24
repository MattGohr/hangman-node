var Letter = require('./letter');

function Word(word) {
    this.word = word;

    this.letterArray = [];
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
        return this.letterArray.join(' ');
    }
}

module.exports = word;
