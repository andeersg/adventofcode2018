const fs = require('fs');
const expect = require('expect');

function task1(input) {
  const lines = input.trim().split('\n');
  let total = 0;
  lines.forEach((line) => {
    const parts = line.split(': ');
    const layer = parseInt(parts[0]);
    const depth = parseInt(parts[1]);

    if (layer % ((depth - 1) * 2) == 0) {
      total += layer * depth;
    }
  });

  return total;
}

function task2(input) {
  const lines = input.trim().split('\n');
  const layers = [];

  lines.forEach((line) => {
    const [layer, depth] = line.split(': ').map(Number);
    layers[layer] = depth;
  });

  let delay = 0, searching = true;
  while(searching) {
    searching = false;
    for(let i = 0; i < layers.length; i++) {
      if(layers[i] === undefined) {
        continue;
      }
      if((i + delay) % ((layers[i] - 1) * 2) === 0) {
        searching = true;
        delay++;
        break;
      }
    }
  }

  return delay;
}


const sample = `0: 3
1: 2
4: 4
6: 4`;

expect(task1(sample)).toEqual(24);

const data = fs.readFileSync('./assets/aoc13.txt', 'utf8');

console.log(task1(data));

expect(task2(sample)).toEqual(10);

console.log(task2(data));