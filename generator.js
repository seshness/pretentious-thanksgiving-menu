/**
 * See Section 15.3 of Programming Pearls for background
 * http://www.cs.bell-labs.com/cm/cs/pearls/sec153.html
 */

var _ = require('underscore'),
    fs = require('fs');

var input = fs.readFileSync('dishes.txt', {
  encoding: 'utf-8'
});

var ORDER = 2;
var NON_WORD_REGEX = /\s+/g;
var COMMENT_REGEX = /^\/\/[^\n]*\n?$/gm;

/**
 * Maps phrases to arrays of candidate following phrases
 */
var phrases = {};

function fetch(arr, i) {
  return arr[i] || null;
}

function phrasegen(words, start, stop) {
  return _.chain(_.range(start, stop))
      .map(fetch.bind(null, words))
      .compact()
      .value()
      .join(' ');
}

/**
 * Initialisation
 */

var input_words = input.replace(COMMENT_REGEX, '').split(NON_WORD_REGEX);
_.each(input_words, function(word, i) {
  var prev = phrasegen(input_words, i, i + ORDER),
      next = input_words[i + ORDER] || '';

  if (next.length !== 0) {
    if (!phrases[prev]) {
      phrases[prev] = [];
    }
    phrases[prev].push(next);
  }
});

/**
 * Generation
 */

module.exports = function() {
  var LIMIT = 20;

  var start = _.sample(_.keys(phrases)),
      count = 0,
      next = phrases[start],
      text = start,
      words = start.split(NON_WORD_REGEX),
      selectedWord;

  while (count < LIMIT && next !== undefined) {
    count += 1;
    selectedWord = _.sample(next);
    text += ' ' + selectedWord;
    words.shift();
    words.push(selectedWord);
    next = phrases[words.join(' ')];
  }

  return text.trim();
};
