const expect = require('expect');
const fs = require('fs');

const task1Data = fs.readFileSync('./assets/aoc12.txt', 'utf8');


function parseLine(line) {
  const matches = line.match(/([0-9]+) <-> ([0-9, ]+)/);

  if (!matches) {
    return false;
  }

  return {
    origin: matches[1],
    connected: matches[2].split(', '),
  }
}

function visitRoom(id, visited, data) {
  if (visited.indexOf(id) == -1) {
    visited.push(id);
    data[id].forEach((room) => {
      return visitRoom(room, visited, data);
    });
  }
  else {
    // We have visited this one before.
    return;
  }
}

function task1(input) {
  const lines = input.trim().split('\n');
  const data = {};
  const visitedRooms = [];
  lines.forEach((line) => {
    const d = parseLine(line);
    data[d.origin] = d.connected;
  });

  visitRoom('0', visitedRooms, data);
  return visitedRooms.length;
}

function task2(input) {
  const lines = input.trim().split('\n');
  const data = {};
  const visitedRooms = {}; // Object of groups.
  let currentGroup = 0;
  lines.forEach((line) => {
    const d = parseLine(line);
    data[d.origin] = d.connected;
  });
  let rooms = Object.keys(data);

  // Start with first item in lines, and follow everything
  // then remove all those rooms from list and start with new first.
  // repeat this as long as there are rooms.

  while (rooms.length > 0) {
    currentGroup += 1;
    visitedRooms[currentGroup] = [];
    visitRoom(rooms[0], visitedRooms[currentGroup], data);
    rooms = rooms.filter((a) => visitedRooms[currentGroup].indexOf(a) < 0);
  }

  return currentGroup;
}


const example = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

expect(task1(example)).toEqual(6);
expect(task2(example)).toEqual(2);
console.log(task1(task1Data));
console.log(task2(task1Data));
