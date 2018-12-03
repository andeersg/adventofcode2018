const fs = require('fs');
const ex = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
`;

// const rows = ex.split("\n").filter(i => i !== '');

// const data = document.querySelector('pre').innerText; const rows = data.split("\n").filter(i => i !== '');
const data = fs.readFileSync('../input_data/input-03.txt', 'utf8');
const rows = data.split("\n").filter(i => i !== '');

function parse(row) {
  const matches = row.match(/#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/);
  return {
    id: matches[1],
    left: parseInt(matches[2]),
    top: parseInt(matches[3]),
    width: parseInt(matches[4]),
    height: parseInt(matches[5]),
  };
}

function verifyCell(x, y) {
  grid[x] = grid[x] || {};
  grid[x][y] = grid[x][y] || []; // List if ids occupying this space.
}

function findOverlaps(grid) {
  let overlaps = 0;
  const v = Object.values(grid);
  v.forEach((col) => {
    Object.values(col).forEach(cell => {
      if (cell.length > 1) {
        overlaps += 1;
      }
    });
  });
  return overlaps;
}

function findUnique(grid) {
  let ids = rows.map(parse).map(i => i.id);
  const v = Object.values(grid);
  v.forEach((col) => {
    Object.values(col).forEach(cell => {
      if (cell.length > 1) {
        ids = ids.filter(i => {
          return !cell.includes(i);
        });
      }
    });
  });
  return ids[0];
}


const grid = {};

rows.forEach((row) => {
  const data = parse(row);
  for (let i = data.left; i < data.left + data.width; i++) {
    for (let j = data.top; j < data.top + data.height; j++) {
      verifyCell(i, j);

      grid[i][j].push(data.id);
    }
  }
});
console.time('total');
console.time('part1');
console.log(findOverlaps(grid));
console.timeEnd('part1');
console.time('part2');
console.log(findUnique(grid));
console.timeEnd('part2');
console.timeEnd('total');