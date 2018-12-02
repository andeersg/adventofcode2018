const fs = require('fs');
const expect = require('expect');
const leftPad = require('left-pad');
const NumberConverter = require('number-converter').NumberConverter;
const nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.BINARY);

let A = 591, B = 393;

const AF = 16807;
const BF = 48271;
const MASK = (1 << 16) - 1;

let score = 0;
// 
// for (let i = 0; i < 5E6; i++) {
//     do { A = (A * 16807) % 2147483647; } while (A & 3);
//     do { B = (B * 48271) % 2147483647; } while (B & 7);
//     if ((A & 0xFFFF) == (B & 0xFFFF)) score++;
// }

function calcNext(n, factor) {
  const next = (n * factor) % 2147483647;
  return next;
}

function calcBinPad(n, factor) {
  const j = calcNext(n, factor);
  return leftPad(nc.convert(j), 32, 0);
} 

function part1(a, b) {
  let match = 0;
  for (let i = 0; i < 40000000; i++) {
    a = calcNext(a, AF);
    b = calcNext(b, BF);
    if ((a & MASK) === (b & MASK)) {
      match += 1;
    }
  }
  return match;
}

function part2(a, b) {
  let match = 0;

  for (let i = 0; i < 5000000; i++) {
    do {
      a = calcNext(a, AF);
    } while (a % 4 !== 0);
    do {
      b = calcNext(b, BF);
    } while (b % 8 !== 0);

    if ((a & MASK) === (b & MASK)) {
      match += 1;
    }
  }
  return match;
}


expect(calcNext(65, AF)).toEqual(1092455);
expect(calcNext(8921, BF)).toEqual(430625591);

expect(calcBinPad(65, AF)).toEqual('00000000000100001010101101100111');
expect(calcBinPad(8921, BF)).toEqual('00011001101010101101001100110111');

console.log(part1(116, 299));
console.log(part2(116, 299));