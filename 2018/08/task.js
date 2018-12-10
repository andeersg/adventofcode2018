const fs = require('fs');
const assert = require('assert');

const ex = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
const file = fs.readFileSync('./input.txt', 'utf8');

const sampleInput = ex.trim().split(' ').map(i => parseInt(i));
const input = file.trim().split(' ').map(i => parseInt(i));

const sampleInput2 = sampleInput.slice();
const input2 = input.slice();

function part1(data) {
  const childNodes = data.shift();
  const metadata = data.shift();

  let ans = 0;
  for (let i = 0; i < childNodes; i++) {
    ans += part1(data);
  }

  for (let j = 0; j < metadata; j ++) {
    ans += data.shift();
  }
    
  return ans;
}

function part2(data) {
  const childNodes = data.shift();
  const metadata = data.shift();

  if (childNodes) {
    // Go recursive.
    const childNodeData = [];
    
    for (let i = 0; i < childNodes; i++) {
      childNodeData.push(part2(data));
    }

    const metaKeys = [];
    
    for (let j = 0; j < metadata; j++) {
      metaKeys.push(data.shift());
    }

    let ans = 0;
    for (let k = 0; k < metaKeys.length; k++) {
      const key = metaKeys[k];
      const index = key - 1;
      if (index >= 0 && index < childNodeData.length) {
        ans += childNodeData[index];
      }
    }
    return ans;
  }
  else {
    let metaSum = 0;
    for (let i = 0; i < metadata; i++) {
      metaSum += data.shift();
    }
    return metaSum;
  }
}

assert.equal(part1(sampleInput), 138);
assert.equal(part2(sampleInput2), 66);

console.log(part1(input));
console.log(part2(input2));