const expect = require('expect');
const fs = require('fs');

const sample_grid = `..#
#..
...`;


function readGrid(input, starts, debug = false) {
  const grid = {};
  const lines = input.trim().split('\n').map((n) => n.trim());
  
  const startX = -Math.abs(Math.floor(lines[0].length / 2));
  let y = -Math.abs(Math.floor(lines.length / 2));
  let x = startX;
  
  starts.x = Math.floor(lines[0].length / 2);
  starts.y = Math.floor(lines.length / 2);
  
  y = 0;
  x = 0;
  
  if (debug) {
    console.log('Columns:', lines[0].length);
    console.log('Rows:', lines.length);
    console.log('We start at:', x, y);
  }

  lines.forEach((line) => {
    grid[y] = {};
    x = 0; // startX;
    
    line.split('').forEach((item) => {
      grid[y][x] = item;
      x += 1;
    });
    y += 1;
  });
  return grid;
}

function turn(dir, turn) {
  if (turn == 'invert') {
    if (dir == 'up') { return 'down'; }
    else if (dir == 'down') { return 'up'; }
    else if (dir == 'left') { return 'right'; }
    else if (dir == 'right') { return 'left'; }
  }

  if (dir == 'up' && turn == 'left') { return 'left'; }
  else if (dir == 'up' && turn == 'right') { return 'right'; }

  else if (dir == 'right' && turn == 'left') { return 'up'; }
  else if (dir == 'right' && turn == 'right') { return 'down'; }

  else if (dir == 'down' && turn == 'left') { return 'right'; }
  else if (dir == 'down' && turn == 'right') { return 'left'; }

  else if (dir == 'left' && turn == 'left') { return 'down'; }
  else if (dir == 'left' && turn == 'right') { return 'up'; }
}

function part1(input, rounds) {
  const starts = {x:0, y:0};
  const grid = readGrid(input, starts);

  const p = {
    x: starts.x,
    y: starts.y,
    dir: 'up',
  };
  let infected = 0;

  for (let i = 0; i < rounds; i++) {
    if (typeof grid[p.y] == 'undefined') {
      grid[p.y] = {};
    }
    if (typeof grid[p.y][p.x] == 'undefined') {
      grid[p.y][p.x] = '.';
    }
    
    // Step 1: direction.
    if (grid[p.y][p.x] == '#') {
      // Infected
      p.dir = turn(p.dir, 'right');
    } else {
      // Not infected
      p.dir = turn(p.dir, 'left');
      
      // This one will be converted.
      infected += 1;
    }
    // Step 2: convert
    grid[p.y][p.x] = (grid[p.y][p.x] == '.' ? '#' : '.');

    // Step 3: Move
    if (p.dir == 'up') { p.y -= 1; }
    else if (p.dir == 'down') { p.y += 1; }
    else if (p.dir == 'left') { p.x -= 1; }
    else if (p.dir == 'right') { p.x += 1; }
  }
  return infected;
}

function part2(input, rounds) {
  const starts = {x:0, y:0};
  const grid = readGrid(input, starts);

  const p = {
    x: starts.x,
    y: starts.y,
    dir: 'up',
  };
  let infected = 0;

  for (let i = 0; i < rounds; i++) {
    if (typeof grid[p.y] == 'undefined') {
      grid[p.y] = {};
    }
    if (typeof grid[p.y][p.x] == 'undefined') {
      grid[p.y][p.x] = '.';
    }
    
    // Step 1: direction.
    if (grid[p.y][p.x] == '#') {
      // Infected
      p.dir = turn(p.dir, 'right');
      grid[p.y][p.x]  = 'F';
    } else if (grid[p.y][p.x] == '.') {
      // Not infected
      p.dir = turn(p.dir, 'left');
      grid[p.y][p.x]  = 'W';
    } else if (grid[p.y][p.x] == 'W') {
      // Weakened, continue same direction.
      grid[p.y][p.x]  = '#';
      // This one will be converted.
      infected += 1;
    }
    else if (grid[p.y][p.x] == 'F') {
     // Invert direction:
     p.dir = turn(p.dir, 'invert');
     grid[p.y][p.x]  = '.';
   }

    // Step 3: Move
    if (p.dir == 'up') { p.y -= 1; }
    else if (p.dir == 'down') { p.y += 1; }
    else if (p.dir == 'left') { p.x -= 1; }
    else if (p.dir == 'right') { p.x += 1; }
  }
  return infected;
}


expect(part1(sample_grid, 70)).toEqual(41);
expect(part1(sample_grid, 10000)).toEqual(5587);

const input22 = fs.readFileSync('./assets/aoc22.txt', 'utf8');

console.log(part1(input22, 10000));

expect(part2(sample_grid, 100)).toEqual(26);
expect(part2(sample_grid, 10000000)).toEqual(2511944);

console.log(part2(input22, 10000000));
