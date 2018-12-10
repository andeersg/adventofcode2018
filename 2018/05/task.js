const fs = require('fs');

const ex = 'dabAcCaCBAcCcaDA';

function matches(a, b) {
  const ucA = a.toUpperCase();
  const ucB = b.toUpperCase();
  let oneUC = false;

  if ((ucA === a && ucB !== b) || (ucA !== a && ucB === b)) {
    oneUC = true;
  }

  if (a.toLowerCase() == b.toLowerCase() && oneUC) {
    return true;
  }
  return false;
}

function removePair(data) {
  for (let i = 0; i < data.length - 1; i++) {
    const a = data[i];
    const b = data[i+1];
    const remove = matches(a, b);
    if (remove) {
      return data.slice(0, i) + data.slice(i + 2); 
    }
  }
  return data;
}

function removeUntil(data, print_answer = true) {
  let prev = data;
  let shrinking = true;

  while (shrinking) {
    const new_string = removePair(prev);
    
    if (new_string.length < prev.length) {
      prev = new_string;
    }
    else {
      shrinking = false;
    }
  }
  if (print_answer) {
    console.log('Answer #1:', prev.length);
  }
  return prev.length;
}

removeUntil(ex);

let data = fs.readFileSync('./input.txt', 'utf8');
data = data.trim();

removeUntil(data);

function part2(data) {
  let table = {};

  for (let i = 0; i < 26; i++) {
    let low = String.fromCharCode(97 + i);
    let up = String.fromCharCode(65 + i);
    const regex = new RegExp("[" + low + up + "]", "g");
    let tempInput = data.replace(regex, '');
    table[up] = removeUntil(tempInput, false);
  }
  return Object.entries(table).sort((a, b) => { b[1] - a[1]})[0];
}
console.log(part2(data))