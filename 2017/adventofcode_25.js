const expect = require('expect');

// 4387

const sample = `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
`;

const parseInput = (input) => {
  const lines =  input.split('\n');
  const checksum = parseInt(lines[1].match(/after ([0-9]+) steps.$/)[1]);
  lines.splice(0, 3);

  const commands = {};
  let cmdInProgress = false;
  let currentCommand = '';

  console.log(lines.slice(10, 20));

  // lines.forEach((line) => {
  //   if (line.substr(0, 8) == 'In state') {
  //     const stateName = line.substr(10, 1);
  //     cmdInProgress = true;
  //     commands[stateName] = {};
  //     currentCommand = stateName;
  //   }
  //   else if (line.substr(2, 2) == 'If') {
  //     // condition.
  //     const val = line.substr(28, 1);
  // 
  //   }
  // });
};

parseInput(sample);