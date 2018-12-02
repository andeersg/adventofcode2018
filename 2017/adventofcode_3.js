const expect = require('expect');
const fs = require('fs');

function part1(input) {
  let sum = 0;
  
  
  
  return sum;
}

function mapNumberToCoordinate(number) {
  let distToCorner = 1;
  let stepsLeft = 1;
  let first = true;
  let n = 1;
  let dir = 'r';
  let x = 0;
  let y = 0;

  while (n < (number + 1)) {
    if (n == number) {
      console.log('We found it!');
      console.log('N', n, 'X:', x, 'Y:', y);
      break;
    }
  
    if (stepsLeft == 0) {
      if (dir === 'l') { dir = 'd'; }
      else if (dir === 'd') { dir = 'r'; }
      else if (dir === 'r') { dir = 'u'; }
      else if (dir === 'u') { dir = 'l'; }
      if (!first) {
        distToCorner += 1;
        stepsLeft = distToCorner;
        first = true;
      }
      else {
        first = false;
      }
    }
    else {
      stepsLeft--;
    }

    if (dir === 'l') {
      x--;
    }
    else if (dir === 'd') {
      y++;
    }
    else if (dir === 'r') {
      x++;
    }
    else if (dir === 'u') {
      y--;
    }

    n++;
  }

  return {
    x: x,
    y: y
  };
}

// expect(mapNumberToCoordinate(1)).toEqual({x: 0, y: 0});
expect(mapNumberToCoordinate(11)).toEqual({x: 2, y: 0});

const co = mapNumberToCoordinate(361527);
console.log('Distance is:', Math.abs(co.x - 0) + Math.abs(co.y - 0));


//expect(part1(1)).toEqual(0);
//expect(part1(12)).toEqual(3);
//expect(part1(23)).toEqual(2);
//expect(part1(1024)).toEqual(31);


// 1 h, 2 o, 3 v,  4n ...

var input = 361527;
function num2xy(x) {
  if (x === 0) { return [0,0]; }
  var s = Math.floor(Math.sqrt(x));
  var r = Math.floor((s - 1) / 2) + 1;
  a = x - Math.pow((r * 2) - 1, 2);
  var da = (a % (r * 2)) - r + 1;
  var q = Math.floor(a / (r * 2));
  var x,y;
  switch(q) {
      case 0: x = r; y = da; break;
      case 1: y = r; x = -da; break;
      case 2: x = -r; y = -da; break;
      case 3: y = -r; x = da; break;
  }
  return [x,y];
}
var xy = num2xy(input - 1).map(Math.abs);
console.log(xy[0] + xy[1]);

function num2xys(x) { return num2xy(x).join(','); }

var field = {'0,0': 1};

function sumAround(x) {
  var xy = num2xy(x);
  var s = 0;
  for (var dx = -1; dx < 2; dx++) {
    for (var dy = -1; dy < 2; dy++) {
      if (dx === 0 && dy === 0) { continue; }
      var k = (xy[0] + dx) + ',' + (xy[1] + dy);
      s += field[k] || 0;
    }
  }
  return s;
}

for (var i = 1; field[num2xys(i-1)] < input; i++) {
  field[num2xys(i)] = sumAround(i);
}
console.log(field[num2xys(i-1)]);