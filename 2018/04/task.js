const fs = require('fs');

const ex = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`;

const file = fs.readFileSync('./input-04.txt', 'utf8');

function parse(line) {
  const matches = line.match(/\[([0-9]+)-([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)\] (.+)/);
  const data = {
    year: matches[1],
    month: matches[2],
    day: matches[3],
    hour: matches[4],
    minute: parseInt(matches[5]),
    text: matches[6],
  };
  return data;
}

function getGuardID(text) {
  const matches = text.match(/#([0-9]+)/);
  return matches[1];
}

const lines2 = ex.split("\n").filter(i => i !== '').map(parse);
const lines = file.split("\n").filter(i => i !== '').sort().map(parse);

const guardData = {};
let currentGuard = '';
let startedSleeping = 0;

lines.forEach((item) => {
  if (item.text.startsWith('Guard')) {
    const id = getGuardID(item.text);
    currentGuard = id;
    guardData[currentGuard] = (guardData[currentGuard] || {
      total: 0,
      minutes: {},
    }); 
  }
  else if (item.text.startsWith('wakes up')) {
    guardData[currentGuard].total = guardData[currentGuard].total + (item.minute - startedSleeping);
    for (let i = startedSleeping; i !== item.minute; i = (i + 1) % 60) {
      guardData[currentGuard].minutes[i] = (guardData[currentGuard].minutes[i] || 0) + 1;
    }
  }
  else if (item.text.startsWith('falls asleep')) {
    startedSleeping = item.minute;
  }
});

function getSleepyMinute(data) {
  
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  
  return parseInt(sorted[0][0]);
}

function step1(data) {
  const sorted = Object.entries(data).sort((a, b) => b[1].total - a[1].total);
  const i = {
    id: sorted[0][0],
    total: sorted[0][1].total,
    minute: getSleepyMinute(sorted[0][1].minutes),
  }

  return i;
}

const sleepyGuard = step1(guardData);
console.log(sleepyGuard);

console.log('Sleepy guard:', sleepyGuard.id);
console.log('Sleepy minute:', sleepyGuard.minute);
console.log('Answer part1:', (sleepyGuard.id * sleepyGuard.minute));

// Part 2:

let maxOccurences = 0;
let guard;
let selectedMin;

Object.entries(guardData).forEach((item) => {
  const id = item[0];
  const minuteData = Object.entries(item[1].minutes).sort((a, b) => b[1] - a[1]);

  if (minuteData[0] && minuteData[0][1] > maxOccurences) {
    maxOccurences = minuteData[0][1];
    guard = id;
    selectedMin = minuteData[0][0];
  }
});

console.log('Sleepy guard #2:', guard);
console.log('Answer #2:', (parseInt(guard) * parseInt(selectedMin)));
