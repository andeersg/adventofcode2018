const assert = require('assert');

function addToList(value, marble) {
  const toAdd = {
      value,
      prev: marble,
      next: marble.next,
  };
  marble.next.prev = toAdd;
  marble.next = toAdd;
  return toAdd;
};

function play_game(players, last_marble) {
  const scoreboard = {};
  let current = {
    value: 0,
  };
  current.next = current;
  current.prev = current;

  for (let i = 1; i < last_marble; i++) {
    scoreboard[i % players] = scoreboard[i % players] || 0;
    if (i % 23 == 0) {
      scoreboard[i % players] += i;
      current = current.prev.prev.prev.prev.prev.prev;
      scoreboard[i % players] += current.prev.value;
      current.prev.prev.next = current;
      current.prev = current.prev.prev;
    }
    else {
      current = addToList(i, current.next);
    }
  }
  
  return Math.max(...Object.values(scoreboard));
}

assert.equal(play_game(9, 25), 32);
assert.equal(play_game(10, 1618), 8317);
assert.equal(play_game(13, 7999), 146373);

console.log('#1:', play_game(416, 71975));
console.log('#2:', play_game(416, 71975 * 100));