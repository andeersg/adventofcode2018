const example = `abcdef
bababc
abbcde
abcccd
aabcdd
aabcdd
ababab
`;

const lines = document.querySelector('pre').innerText.split("\n").filter(i => i !== '');
const matches = {
  two: 0,
  three: 0,
};

lines.forEach((line) => {
  const counts = line.split('').sort().reduce((acc, current) => {
    acc[current] = acc[current] || 0;
    acc[current] += 1;
    return acc;
  }, {});

  const hasThree = !!Object.values(counts).filter(i => i == 3).length;
  const hasTwo = !!Object.values(counts).filter(i => i == 2).length;
  if (hasThree) {
    matches.three += 1;
  }
  if (hasTwo) {
    matches.two += 1;
  }
});

console.log(`The answer is: ${matches.two * matches.three}`);


