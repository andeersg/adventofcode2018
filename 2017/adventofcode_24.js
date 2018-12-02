const fs = require('fs');
// 
// fs.readFile(__dirname + '/assets/aoc24.txt', 'utf8', (err, data) => {
//     const ends = [], nodes = [[0, 0]];
//     data.trim().split('\n').forEach((l, i) => {
//         const parts = l.split('/').map(Number);
//         nodes.push(parts);
//         parts.forEach((e) => {
//             ends[e] = ends[e] || new Set();
//             ends[e].add(i + 1);
//         });
//     });
// 
//     console.log(search1(ends, nodes, new Set(), 0, 0, 0));
// });
// 
// function search1(ends, nodes, used, current, end, strength) {
//     const used2 = new Set(used).add(current);
//     const next = nodes[current][(nodes[current].indexOf(end) + 1) % 2];
//     let max = strength;
//     for(const e of ends[next]) {
//         if(used2.has(e)) {
//             continue;
//         }
//         max = Math.max(max, search1(ends, nodes, used2, e, next, strength + nodes[e][0] + nodes[e][1]));
//     }
//     return max;
// }

function solve(n) {
  n = n.split('\n').map(l => l.split('/').map(Number))

  let bestP1 = 0

  let bestP2 = 0
  let lenP2 = 0

  for (let i = 0; i < 1000000000; ++i) {
    if (i % 10000 === 0) {
      console.log(i)
      console.log('Best P1:', bestP1)
      console.log('Best P2:', bestP2, 'length:', lenP2)
    }

    const [val, len] = getLink(n.slice())
    if (val > bestP1) {
      bestP1 = val
    }
    if (len > lenP2) {
      bestP2 = val
      lenP2 = len
    } else if (len === lenP2 && val > bestP2) {
      bestP2 = val
    }
  }

  return bestP1
}

function getLink(n) {
  let currentLink = 0
  let links = []
  while (true) {
    // Find values with cLink
    let possibles = n.filter(v => v[0] === currentLink || v[1] === currentLink)
    if (possibles.length === 0) break
    let link
    if (Math.random() > 0.45) { // 45% chance to get a random link
      link = possibles[Math.floor(Math.random() * possibles.length)]
    } else { // 55% chance to get the best link you can choose next
      link = possibles.reduce((p, c) => (c[0] + c[1] > p[0] + p[1] ? c : p), [
        -1,
        -1
      ])
    }
    links.push(link)
    let i = link.indexOf(currentLink)
    currentLink = link.slice(1 - i, 2 - i)[0]
    // Remove max from 'n'
    n.splice(n.indexOf(link), 1)
  }
  return [links.reduce((p, c) => p + c[0] + c[1], 0), links.length]
}

const input2 = fs.readFileSync(__dirname + '/assets/aoc24.txt', 'utf8');
// solve(input);

var input = input2.split('\n').map(x => x.split('/').map(x => parseInt(x)));

function addPart(part, index) {
  l = partList[part[index]];
  if (l == null) {
    partList[part[index]] = [part]
  } else {
    l.push(part);
  }
}

var partList = [];
for (var part of input) {
  addPart(part, 0);
  addPart(part, 1);
}

function port(part, number) {
  if (part[0] == number) {
    return 0;
  }
  return 1;
}

function otherPort(part, number) {
  return (port(part, number) + 1) % 2
}

function partStrength(part) {
  return part[0] + part[1];
}

function bridgeStrength(bridge) {
  var s = 0;
  for (var part of bridge) {
    s += partStrength(part);
  }
  return s;
}

function containsPart(bridge, part) {
  return bridge.indexOf(part) != -1;false;
}

var maxBridge = [];
var maxStrength = 0;

function rec(bridge, nextPort) {
  var next = partList[nextPort] || [];

  var found = false;
  for (var part of next) {
    if (!containsPart(bridge, part)) {
      var b = bridge.slice();
      b.push(part);
      rec(b, part[otherPort(part, nextPort)]);
      found = true;
    }
  }

  if (!found) {
    var strength = bridgeStrength(bridge);
    if (bridge.length > maxBridge.length || (bridge.length == maxBridge.length && strength > maxStrength)) {
      maxStrength = strength;
      maxBridge = bridge;
    }
  }
}

rec([], 0);

console.log(maxStrength)