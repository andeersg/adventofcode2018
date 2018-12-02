const assert = require('assert');
const fs = require('fs');

const examples = [
  {
    test: '+1, -1',
    answer: 0,
  },
  {
    test: '+3, +3, +4, -2, -4',
    answer: 10,
  },
  {
    test: '-6, +3, +8, +5, -6',
    answer: 5,
  },
  {
    test: '+7, +7, -2, -7, -4',
    answer: 14,
  },
];


function parseSequence(actions) {
  const initial = 0;
  const frequencesFound = new Set([initial]);
  let updated = initial;
  let duplicateFound = false;

  while (!duplicateFound) {
    for (let i = 0; i < actions.length; i++) {
      const op = actions[i];
      const upordown = op.substring(0, 1);
      const value = parseInt(op.substring(1));

      if (upordown == '+') {
        updated += value;
      }
      else if (upordown == '-') {
        updated -= value;
      }

      if (frequencesFound.has(updated)) {
        // This is the value!
        return updated;
      }
      else {
        frequencesFound.add(updated);
      }
    }
  }



  return updated;
}

assert.strictEqual(parseSequence(examples[0].test.split(', ')), examples[0].answer);
assert.strictEqual(parseSequence(examples[1].test.split(', ')), examples[1].answer);
assert.strictEqual(parseSequence(examples[2].test.split(', ')), examples[2].answer);

const file = fs.readFileSync('../input_data/input-01.txt', 'utf8');
const ops = file.split("\n");
console.time('Part 2');
const answer = parseSequence(ops);
console.log(`Answer to part 2 is: ${answer}`);
console.timeEnd('Part 2');