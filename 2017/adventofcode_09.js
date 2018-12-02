const expect = require('expect');
const fs = require('fs');

function calculateScore (s) {
  let t = 0, d = 1, g = false, f = 0, c;
  for (let n = 0, c = s[0]; n < s.length; n++ , c = s[n]) {
    if (c === '!') n++;
    else if (c === '>') g = false;
    else if (g) f++;
    else if (c === '{' && !g) t += d++;
    else if (c === '}' && !g) d--;
    else if (c === '<') g = true;
  }
  return { t, f };
}

expect(calculateScore('{}')).toEqual({f: 0, t: 1});
expect(calculateScore('{{<ab>},{<ab>},{<ab>},{<ab>}}')).toEqual({f: 8, t: 9});


const data = fs.readFileSync('./assets/aoc9.txt', 'utf8').trim();
console.log(calculateScore(data));