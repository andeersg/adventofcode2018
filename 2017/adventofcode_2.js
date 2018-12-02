const expect = require('expect');
const fs = require('fs');

const example = '5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8';
const example2 = '5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5';

function part1(input) {
  const lines = input.split('\n');
  let sum = 0;
  lines.forEach((line) => {
    const numbers = line.split('\t');
    let low = Math.min(...numbers);
    let high = Math.max(...numbers);
    
    sum += (high - low);
  });

  return sum;
}

function part2(input)  {
  let sum = 0;
  const lines = input.split('\n');

  lines.forEach((line) => {
    const numbers = line.split('\t');

    outer_loop:
    for (let i = 0; i < numbers.length; i++) {
      const nA = numbers[i];

      for (let j = 0; j < numbers.length; j++) {
        // Skip self.
        if (j !== i) {
          const res = nA / numbers[j];
          if (res % 1 == 0) {
            // Found it.
            sum += res;
            break outer_loop;
          }
        }
      }
    }
    
  });

  return sum;
}


expect(part1(example)).toEqual(18);
expect(part2(example2)).toEqual(9);

const content = fs.readFileSync('./assets/aoc2.txt', 'utf8');
console.log('Result (1) is:', part1(content));
console.log('Result (2) is:', part2(content));