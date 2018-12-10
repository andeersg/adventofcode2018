const fs = require('fs');
const ex = `position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`;

const file = fs.readFileSync('./input.txt', 'utf8');

function parseLine(line) {
  const data = line.match(/position=<([ 0-9-]+), ([ 0-9-]+)> velocity=<([ 0-9-]+), ([ 0-9-]+)>/);
  return {
    x: +data[1],
    y: +data[2],
    velX: +data[3],
    velY: +data[4],
  };
}

function manhattan(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

//const positions = ex.trim().split("\n");
//const data = positions.map(parseLine);
const positions = file.trim().split("\n");
const data = positions.map(parseLine);

function drawGrid(data) {
  const dArr = Array.from(data.values());

  const lowX = Math.min(...dArr.map(i => i.x));
  const lowY = Math.min(...dArr.map(i => i.y));
  const highX = Math.max(...dArr.map(i => i.x));
  const highY = Math.max(...dArr.map(i => i.y));

  let output = '';

  for (let y = lowY; y <= highY; y++) {
    for (let x = lowX; x <= highX; x++) {
      if (data.get(`${x},${y}`)) {
        output += '#';
      }
      else {
        output += ' ';
      }
    }
    output += "\n";
  }

  return output;
}

function calculatePoints(data, seconds) {
  const gridData = new Map();
  let finalData = new Map();

  let shortest = -1;
  let theSecond = 0;

  for (let second = 0; second <= seconds; second++) {
    data.forEach((el, i) => {
        if (gridData.has(i)) {
          let tmp = gridData.get(i);
          tmp.x += el.velX;
          tmp.y += el.velY;
          gridData.set(i, tmp);
        }
        else {
          gridData.set(i, {
            x: el.x,
            y: el.y,
          });
        }
    });
    const dArr = Array.from(gridData.values());
    const lowX = Math.min(...dArr.map(i => i.x));
    const lowY = Math.min(...dArr.map(i => i.y));
    const highX = Math.max(...dArr.map(i => i.x));
    const highY = Math.max(...dArr.map(i => i.y));
    const dist = manhattan(lowX, highX, lowY, highY);
    if (dist < shortest || shortest == -1) {
      theSecond = second;
      shortest = dist;
      finalData = new Map();
      dArr.forEach((item) => {
        finalData.set(`${item.x},${item.y}`, {
          x: item.x,
          y: item.y,
        });
      });
    }
  }

  console.log('#2:', theSecond);
  

  return finalData;
}

const grid = calculatePoints(data, 10500);

const out = drawGrid(grid);
console.log('#1:');
console.log(out);
