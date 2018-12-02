const fs = require('fs');
const expect = require('expect');

const sample = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

function modifyValue(cmd, data) {
  const [action, item, value] = cmd.split(' ');

  function get(x) {
    var y = Number(x);
    return isNaN(y) ? (data.items[x] || 0): y;
  }
  
  if (typeof data.items[item] == 'undefined') {
    data.items[item] = 0;
  }
  
  let inc = 1;
  let status = true;

  switch (action) {
    case 'snd':
      data.lastPlayed[item] = get(value);
      break;
    case 'set':
      data.items[item] = get(value);
      break;
    case 'add':
      data.items[item] += get(value);
      break;
    case 'mul':
      data.items[item] = data.items[item] * get(value);
      break;
    case 'mod':
      data.items[item] = data.items[item] % get(value);
      break;
    case 'rcv':
      if (data.items[item] != 0) {
        console.log('Recovered item:', item, 'is:', data.lastPlayed[item]);
        console.log(data.lastPlayed);
        status = false;
      }
      break;
    case 'jgz':
      if (data.items[item] > 0) {
        inc = get(value);
      }
      break;
  }
  console.log(data.items);
  data.currentIndex += inc;

  return status;
}

function part1(input) {
  const commands = input.trim().split('\n');
  const data = {
    currentIndex: 0,
    lastPlayed: {},
    items: {}
  }

  while (data.currentIndex < commands.length) {
    const status = modifyValue(commands[data.currentIndex], data);
    if (!status) {
      break;
    }
  }
}


// expect(modifyValue('set a 1', {items: {}})).toEqual({items: {a: 1}});

// part1(sample);
const input = fs.readFileSync('./assets/aoc18.txt', 'utf8');
//part1(raw);

var commands = [];
input.split('\n').forEach(d => {
    commands.push({"name": d.substring(0,3), "args": d.substring(4).split(' ')})
})

function Program(id) {
    this.registers = {};
    this.lastSound = "";
    this.index = 0;
    this.id = id;
    this.sendCount = 0;
    this.queue = [];
    this.registers['p'] = id;

    this.instP1 = {
        "set": (a,b) => { this.registers[a] = this.parse(b); this.index++; },
        "mul": (a,b) => { this.registers[a] *= this.parse(b); this.index++; },
        "add": (a,b) => { this.registers[a] += this.parse(b); this.index++; },
        "mod": (a,b) => { this.registers[a] = this.registers[a] % this.parse(b); this.index++; },
        "snd": a => { this.lastSound = this.parse(a); this.index++; },
        "jgz": (a,b) => { this.index += this.parse(a)>0 ? this.parse(b) : 1; },
        "rcv": a => { if(this.parse(a)>0) { console.log('recovered',this.lastSound); return true; } this.index++; }
    }
    this.instP2 = {
        "set": this.instP1.set,
        "mul": this.instP1.mul,
        "add": this.instP1.add,
        "mod": this.instP1.mod,
        "jgz": this.instP1.jgz,
        "snd": a => { programs[(this.id+1)%2].queue.push(this.parse(a)); this.index++; this.sendCount++; },
        "rcv": a => { if(this.queue.length>0) { this.registers[a] = this.queue.shift(); this.index++; } }
    }
    Program.prototype.executeP1 = function() {
        return this.instP1[commands[this.index].name](...commands[this.index].args);
    }
    Program.prototype.executeP2 = function() {
        return this.instP2[commands[this.index].name](...commands[this.index].args);
    }
    Program.prototype.parse = function(b) {
        return isNaN(b) ? this.registers[b] : parseInt(b);
    }
    Program.prototype.finished = function() {
        return this.index < 0 || this.index >= commands.length;
    }
    Program.prototype.finishedOrStalled = function() {
        return this.finished() || (commands[this.index].name == 'rcv' && this.queue.length == 0);
    }
}

// part 1
var prog = new Program(0);
while(!prog.executeP1());

// part 2
var programs = [new Program(0), new Program(1)]
do {
    programs.forEach(d => { if(!d.finished()) d.executeP2(); })
} while(!programs.reduce((a,b) => a && b.finishedOrStalled(),true))

console.log('program 1 send count:',programs[1].sendCount)