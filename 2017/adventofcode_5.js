const expect = require('expect');
const fs = require('fs');

fs.readFile(__dirname + '/assets/aoc5.txt', 'utf8', (err, data) => {
    // data = data.trim();
    // data = data.split('\n').map(x => parseInt(x));
    // var count = 0;
    // var offset = 0;
    // while(offset >= 0 && offset < data.length) {
    //     offset += data[offset]++;
    //     count++;
    // }
    // 
    // console.log('Part 1:',count);
    
    data = data.trim();
    data = data.split('\n').map(x => parseInt(x));
    var count = 0;
    var offset = 0;
    while(offset >= 0 && offset < data.length) {
        var toffset = offset;
        offset += data[offset];
        data[toffset] += data[toffset] >= 3 ? -1 : 1;
        count++;
    }

    console.log('Part 2:',count);
});