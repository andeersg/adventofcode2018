const expect = require('expect');

function moveToIndex(length, current, steps) {
  for (let i = 1; i <= steps; i++) {
    if ((current + 1) < length) {
      current += 1;
    }
    else {
      current = 0;
    }
  }

  return current + 1;
}

function part2(step, rounds) {
  let pos = 0, value = 0;
  for (let i = 1; i <= rounds; i++) {
    pos = ((pos + step) % i) + 1;
    if(pos === 1) {
      value = i;
    }
  }

  return value;
}

console.time('part2alt');
console.log('Part2:', part2(376, 50000001));
console.timeEnd('part2alt');
