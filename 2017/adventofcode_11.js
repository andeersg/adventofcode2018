const expect = require('expect');

function reduceDirections(input, debug = false) {
  const directions = input.trim().split(',');
  const combines = {
    'n': ['ne', 'nw'],
    's': ['se', 'sw'],
    'ne': ['n', 'se'],
    'nw': ['n', 'sw'],
    'se': ['s', 'ne'],
    'sw': ['s', 'nw'],
  };
  const reducers = {
    'n': 's',
    's': 'n',
    
  }

  const dirCount = {
    'n': 0,
    's': 0,
    'ne': 0,
    'nw': 0,
    'se': 0,
    'sw': 0,
  };
  directions.forEach((dir) => {
    dirCount[dir] += 1;
  });

  const origN = dirCount.n;
  dirCount.n = dirCount.n - dirCount.s;
  dirCount.s = (dirCount.s > origN ? dirCount.s - origN : 0);

  for (key in combines) {
    //console.log(key);
    //dirCount[key] = Math.abs();
    if (!dirCount[combines[key][0]] || !dirCount[combines[key][1]]) {
      continue;
    }
    
    const common = Math.min(dirCount[combines[key][0]], dirCount[combines[key][1]]);
    dirCount[key] = (dirCount[key] || 0) + common;
    dirCount[combines[key][0]] -= common;
    dirCount[combines[key][1]] -= common;
  }
  


  if (debug) {
    console.log(dirCount);
  }

  return (dirCount.n + dirCount.s + dirCount.ne + dirCount.nw + dirCount.se + dirCount.sw);
}


expect(reduceDirections('ne,ne,ne')).toEqual(3);
expect(reduceDirections('ne,ne,sw,sw')).toEqual(0);
// expect(reduceDirections('ne,ne,s,s')).toEqual(2);
// expect(reduceDirections('se,sw,se,sw,sw')).toEqual(3);
// ne se ne se se

//expect(reduceDirections('n,n,s,s,s,s,se,sw,se,sw,sw', true)).toEqual(42);