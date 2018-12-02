const assert = require('assert');
const fs = require('fs');

const ex1 = '+1, +1, +1'.split(', ');
const ex2 = '+1, +1, -2'.split(', ');
const ex3 = '-1, -2, -3'.split(', ');

function parseSequence(actions) {
  const initial = 0;
  let updated = initial;

  actions.forEach(op => {
    const upordown = op.substring(0, 1);
    const value = parseInt(op.substring(1));
    if (upordown == '+') {
      updated += value;
    }
    else if (upordown == '-') {
      updated -= value;
    }
  });

  return updated;
}

assert.strictEqual(parseSequence(ex1), 3);
assert.strictEqual(parseSequence(ex2), 0);
assert.strictEqual(parseSequence(ex3), -6);

const file = fs.readFileSync('../input_data/input-01.txt', 'utf8');
const ops = file.split("\n");

const answer = parseSequence(ops);
console.log(`Answer to part 1 is: ${answer}`);
