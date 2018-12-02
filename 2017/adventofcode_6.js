const expect = require('expect');

const sample = '0\t2\t7\t0';
const realInput = '4\t1\t15\t12\t0\t9\t9\t5\t5\t8\t7\t3\t14\t5\t12\t3';

function moveBlocks(blocks, list, start) {
  while (blocks > 0) {
    list[start] += 1;
    blocks -= 1;
    start = (start == (list.length - 1) ? 0 : start + 1);
  }
}

function redistribute(input) {
  let sum = 0;
  let seenBefore = false;
  const variations = [];
  let data = input.split('\t').map(Number);
  let theItem = '';
  
  while (!seenBefore) {
    let highVal = Math.max(...data);
    let highIndex = data.findIndex((n) => (n == highVal));

    data[highIndex] = 0;
    // distribute highval to all, then save state, and move on.
    moveBlocks(highVal, data, (highIndex == (data.length - 1) ? 0 : highIndex + 1));

    sum += 1;
    const snapShot = data.join('');
    if (variations.indexOf(snapShot) > -1) {
      // We found it!
      theItem = snapShot;
      break;
    }
    else {
      variations.push(snapShot);
    }
    
  }

  let first = variations.findIndex((n) => (n == theItem));
  console.log('Part 2:', variations.length - first);

  return sum;
}

expect(redistribute(sample)).toEqual(5);
const sum = redistribute(realInput);
console.log('Part 1:', sum);
