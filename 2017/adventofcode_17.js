const expect = require('expect');

function moveToIndex(array, current, steps) {
  const arrLength = array.length;

  for (let i = 1; i <= steps; i++) {
    if (typeof array[current + 1] !== 'undefined') {
      current += 1;
    }
    else {
      current = 0;
    }
  }

  return current + 1;
}

function part1(step, rounds) {
  let currentPos = 0;
  let currentInc = 1;
  const buffer = [0];

  while (rounds > 0) {
    const nextPos = moveToIndex(buffer, currentPos, step);
    buffer.splice(nextPos, 0, currentInc)

    currentPos = nextPos;
    currentInc += 1;
    rounds -= 1;
  }

  return buffer[currentPos + 1];
}

function part2(step, rounds) {
  let currentPos = 0;
  let currentInc = 1;
  const buffer = [0];

  while (rounds > 0) {
    const nextPos = moveToIndex(buffer, currentPos, step);
    buffer.splice(nextPos, 0, currentInc)

    currentPos = nextPos;
    currentInc += 1;
    rounds -= 1;
  }

  return buffer[1];
}


expect(moveToIndex([0], 0, 3)).toEqual(1);
expect(moveToIndex([0,0,0,0,0], 0, 3)).toEqual(4);
expect(moveToIndex([0, 1], 1, 3)).toEqual(1);

expect(part1(3, 2017)).toEqual(638);

console.log('Part1:', part1(376, 2017));
console.time('part2');
console.log('Part2:', part1(376, 50000001));
console.timeEnd('part2');