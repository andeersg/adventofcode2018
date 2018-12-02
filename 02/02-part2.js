const example = `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
`;

const getEditDistance = function(a, b){
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
        Math.min(matrix[i][j-1] + 1, // insertion
        matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

// const lines = example.split("\n").filter(i => i !== '');
const lines = document.querySelector('pre').innerText.split("\n").filter(i => i !== '');
let a = '';
let b = '';

loop1: for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines.length; j++) {
    if (i !== j) {
      a = lines[i];
      b = lines[j];

      const d = getEditDistance(a, b);
      if (d == 1) {
        break loop1;
      }
      
    }
  }
}
console.log(a, 'and', b);
const answer = [];
for (let x = 0; x < a.length; x++) {
  if (a[x] == b[x]) {
    answer.push(a[x]);
  }
}
console.log(answer.join(''));
