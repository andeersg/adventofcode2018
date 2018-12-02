const fs = require('fs');

const inputData = fs.readFileSync("./assets/aoc10.txt").toString('utf-8');
const inputOne = inputData.split(',');
const inputTwo = inputData.trim().split("");

function range(size) {
    return [...Array(size).keys()]
}

function part1(listSize, lengths, rounds = 1) {
    let list = range(listSize);
    let position = 0;
    let skipSize = 0;
    for (let _ of range(rounds)) {
        for (let length of lengths) {
            let indexes = range(length).map(i => (position + i) % list.length);
            let segment = indexes.map(i => list[i]);
            segment.reverse();
            indexes.forEach(i => list[i] = segment.shift());
            position = (position + length + skipSize++) % list.length;
        }
    }

    return list;
}

const y = part1(256, inputOne.map(Number));

console.log('Part 1:', y[0] * y[1]);

function part2(listSize, input) {
    let lengths = [...input]
        .map(i => i.charCodeAt(0))
        .concat(17, 31, 73, 47, 23);

    let sparseHash = part1(listSize, lengths, 64);
    return range(listSize / 16)
        .map(i => sparseHash.slice(i * 16, (i + 1) * 16))
        .map(chunk => chunk.reduce((x, y) => x ^ y))
        .map(x => x.toString(16))
        .map(x => x.length == 2 ? x : '0' + x)
        .join('');
}

console.log('Part 2:', part2(256, inputData));
