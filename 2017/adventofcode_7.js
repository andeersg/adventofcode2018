const expect = require('expect');
const fs = require('fs');

const sample = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;


function structureInput(input) {
  const reChildren = /([a-z]+) \(([0-9]+)\) -> ([a-z, ]+)/;
  const reNoChildren = /([a-z]+) \(([0-9]+)\)/;
  
  const lines = input.split('\n');
  let structure = [];

  lines.forEach((line) => {
    let data = [];
    if (line.match(reChildren)) {
      data = line.match(reChildren);
      structure.push({
        name: data[1],
        weight: data[2],
        children: data[3].split(', '),
      });
    }
    else if (line.match(reNoChildren)) {
      data = line.match(reNoChildren);
      structure.push({
        name: data[1],
        weight: data[2],
        children: [],
      });
    }
  });

  return structure;
}

function findBase(structure) {
  let index = false;

  structure.forEach((item, i) => {
    let isChildren = false;
    
    structure.forEach((item2) => {
      if (item2.children.indexOf(item.name) > -1) {
        isChildren = true;
      }
    });

    if (!isChildren) {
      index = i;
    }
  });
  
  return index;
}

function addItem(parent, key, structure) {
  const item =  structure.find((i) => i.name == key);
  
  
  parent.childs[key] = {
    weight: item.weight,
    childs: {},
  };
  item.children.forEach((child) => {
    addItem(parent.childs[key], child, structure);
  });
}

function buildTree(structure, top) {
  const tree = {};
  let children = true;
  
  let item = structure[top];
  tree[item.name] = {
    weight: item.weight,
    childs: {},
  };
  item.children.forEach((child) => {
    addItem(tree[item.name], child, structure);
  });
  
  return tree;
}

function part1(input) {
  const structure = structureInput(input);
  const index = findBase(structure);

  return structure[index].name;
}

expect(part1(sample)).toEqual('tknk');

function part2(input) {
  const structure = structureInput(input);
  const index = findBase(structure);
  const tree = buildTree(structure, index);
  console.log(JSON.stringify(tree));
}

const data = fs.readFileSync('./assets/aoc7.txt', 'utf8');
// console.log('Top parent is:', part1(data));
part2(data);