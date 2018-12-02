const expect = require('expect');
const fs = require('fs');

function is_valid(input, sorted) {
  const words = input.split(' ');
  const uniques = [];
  words.forEach((word) => {
    if (sorted) {
      word = word.split('').sort().join('');
    }

    if (uniques.indexOf(word) === -1) {
      uniques.push(word);
    }
  });

  if (words.length === uniques.length) {
    return true;
  }
  return false;
}


expect(is_valid('aa bb cc dd ee')).toEqual(true);
expect(is_valid('aa bb cc dd aa')).toEqual(false);
expect(is_valid('aa bb cc dd aaa')).toEqual(true);
expect(is_valid('abcde fghij', true)).toEqual(true);
expect(is_valid('abcde xyz ecdab', true)).toEqual(false);

const content = fs.readFileSync('./assets/aoc4.txt', 'utf8');
const lines = content.split(/\r?\n/);

let valid1 = 0;
let valid2 = 0;

lines.forEach((line) => {
  if (line.length > 0 && is_valid(line)) {
    valid1 += 1;
  }
  if (line.length > 0 && is_valid(line, true)) {
    valid2 += 1;
  }
});

console.log('Valid phrases (1) are:', valid1);
console.log('Valid phrases (2) are:', valid2);