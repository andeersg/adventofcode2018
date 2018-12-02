const expect = require('expect');
const fs = require('fs');

const sampleInstructions = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;


function parseInstruction(input) {
  const command = input.match(/([a-z]+) (inc|dec) ([0-9-]+) if ([a-z]+) (.+) ([0-9-]+)/);
  let cmd = {};
  
  try {
    cmd = {
      register: command[1],
      operation: command[2],
      amount: command[3],
      condRegister: command[4],
      condCheck: command[5],
      condVal: command[6],
    };
  }
  catch (e) {
    console.log('It crashed on command:');
    console.log(input);
  }

  return cmd;
}

const operators = {
  '<': (a, b) => (a < b),
  '>': (a, b) => (a > b),
  '>=': (a, b) => (a >= b),
  '==': (a, b) => (a == b),
  '<=': (a, b) => (a <= b),
  '!=': (a, b) => (a != b),
};


function parseInput(input) {
  const data = input.split('\n');
  return data;
}

function findLargest(input) {
  const arr = Object.keys(input).map(function ( key ) { return input[key]; });
  const max = Math.max.apply( null, arr );
  return max;
}

function task() {
  const instructions = fs.readFileSync('./assets/aoc8.txt', 'utf8').trim();
  const data = parseInput(instructions);
  const states = {};
  let largestValue = 0;

  data.forEach((command) => {
    const cmd = parseInstruction(command);
    if (typeof states[cmd.register] == 'undefined') {
      states[cmd.register] = 0;
    }
    // Also check the one that is compared.
    if (typeof states[cmd.condRegister] == 'undefined') {
      states[cmd.condRegister] = 0;
    }

    if (operators[cmd.condCheck](states[cmd.condRegister], cmd.condVal)) {
      // Do operation.
      switch (cmd.operation) {
        case 'inc':
          states[cmd.register] += parseInt(cmd.amount);
          break;

        case 'dec':
          states[cmd.register] -= parseInt(cmd.amount);
          break;
      }
    }

    // Part 2:
    let large = findLargest(states);
    if (large > largestValue) {
      largestValue = large;
    }
    
  });
  console.log('Part 1:', findLargest(states));
  console.log('Part 2:', largestValue);
}

task();
