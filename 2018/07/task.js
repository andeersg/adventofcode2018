const fs = require('fs');
const assert = require('assert');

const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.trim().split('\n');

const example = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
const exData = example.trim().split('\n');

function part1(input) {
  const map = {};

  input.forEach(cmd => {
    const parts = cmd.split(' ');
    const a = parts[1];
    const b = parts[7];
    map[a] = map[a] || {n:a, b:{}};
    map[b] = map[b] || {n:b, b:{}};
    map[b].b[a] = true;
  });

  let answer = ''
  while(true){
    const fs = Object.values(map).filter(o => !Object.keys(o.b).length).sort((a, b) => a.n < b.n ? -1 : 1);

    if(!fs[0]) break;
    const n = fs[0].n;
    answer += n;
    delete map[n];
    Object.values(map).forEach(o => {
      delete o.b[n];
    });
  }
  return answer;
}

function part2(input, workers, seconds = 60) {
  const map = {};

  input.forEach(cmd => {
    const parts = cmd.split(' ');
    const a = parts[1];
    const b = parts[7];
    map[a] = map[a] || {n:a, b:{}, d: seconds + a.charCodeAt(0) - 64};
    map[b] = map[b] || {n:b, b:{}, d: seconds + b.charCodeAt(0) - 64};
    map[b].b[a] = true;
  });

  let t = 0;
  let ws = Array(workers).fill('');
  let d = '';

  while(true) {
    let fs = Object.values(map)
      .filter(o=> !Object.keys(o.b).length)
      .sort((a,b)=> a.n < b.n ? -1 : 1);

    if(!fs[0]) break;

    fs = fs.filter(o=> !ws.includes(o.n));
    let i = -1;
    ws = ws.map(w => w || (fs[++i]||{}).n || '');
    ws.forEach((w, i) => {
      if (!map[w]) return;
      map[w].d -= 1;
      if (!map[w].d) {
        delete map[w];
        d += w;
        ws[i] = '';
        Object.values(map).forEach(o => {
          delete o.b[w];
        });
      }
    });
    t += 1;
  }
  return t;
}

assert.equal(part1(exData), 'CABDFE');
console.log('#1:', part1(data));
assert.equal(part2(exData, 2, 0), 15);
console.log('#2:', part2(data, 5));