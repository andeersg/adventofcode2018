const expect = require('expect');

const commands = `set b 57
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`;

const parseCommand = (command) => {
  const parts = command.match(/(set|jnz|mul|sub) ([a-z0-9]) ([0-9-a-z]+)/);
  if (parts) {
    return {
      action: parts[1],
      element: parts[2],
      value: parts[3],
    };
  }
  return false;
};

expect(parseCommand('set b 57')).toEqual({action: 'set', element: 'b', value: '57'});
expect(parseCommand('sub b -100000')).toEqual({action: 'sub', element: 'b', value: '-100000'});
expect(parseCommand('set g b')).toEqual({action: 'set', element: 'g', value: 'b'});

const registers = {
  'a': 0,
  'b': 0,
  'c': 0,
  'd': 0,
  'e': 0,
  'f': 0,
  'g': 0,
  'h': 0,
};

const part1 = (inputReg, commandsIn) => {
  const registers = Object.assign({}, inputReg);
  const commands = commandsIn.split('\n').map(parseCommand);

  function get(x) {
    var y = Number(x);
    return isNaN(y) ? (registers[x] || 0): y;
  }
  
  let i = 0;
  let multiRuns = 0;

  console.log('Commands:', commands.length);

  while (i < commands.length) {
    let inc = 1;
    const cmd = commands[i];
    
    switch (cmd.action) {
      case 'set':
        registers[cmd.element] = get(cmd.value);
        break;

      case 'sub':
        registers[cmd.element] = registers[cmd.element] - get(cmd.value);
        break;

      case 'mul':
        multiRuns += 1;
        registers[cmd.element] = registers[cmd.element] * get(cmd.value);
        break;

      case 'jnz':
        if (get(cmd.element) !== 0) {
          inc = get(cmd.value);
        }
        break;
    }

    i += inc;
  }
  console.log('Multiplications:', multiRuns);
};

const part2 = (registerIn, commandsIn) => {
  const registers = Object.assign({}, inputReg);
  const commands = commandsIn.split('\n').map(parseCommand);

  function get(x) {
    var y = Number(x);
    return isNaN(y) ? (registers[x] || 0): y;
  }
  
  registers['a'] = 1;

  while (i < commands.length) {
    let inc = 1;
    const cmd = commands[i];
    
    switch (cmd.action) {
      case 'set':
        registers[cmd.element] = get(cmd.value);
        break;

      case 'sub':
        registers[cmd.element] = registers[cmd.element] - get(cmd.value);
        break;

      case 'mul':
        multiRuns += 1;
        registers[cmd.element] = registers[cmd.element] * get(cmd.value);
        break;

      case 'jnz':
        if (get(cmd.element) !== 0) {
          inc = get(cmd.value);
        }
        break;
    }

    i += inc;
  }
};


part1(registers, commands);
