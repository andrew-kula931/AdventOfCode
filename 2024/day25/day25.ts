var fs = require("fs");

var filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

const locks: number[][] = [];
const keys: number[][] = [];

let count = 0;
let locking: string[][] = [];
lines.forEach(function (line) {
  if (count < 6) {
    locking.push(line.split(""));
    count++;
  } else {
    locking.push(line.split(""));

    const values: number[] = [];

    for (let x = 0; x < locking[0].length; x++) {
      let internalCount = 0;
      for (let y = 0; y < locking.length; y++) {
        if (locking[y][x] === "#") internalCount++;
      }
      values.push(internalCount);
    }

    if (locking[0][0] == "#") {
      locks.push(values);
    } else {
      keys.push(values);
    }

    count = 0;
    locking = [];
  }
});

let combinations = 0;
for (let key of keys) {
  for (let lock of locks) {
    for (let i = 0; i < 5; i++) {
      if (key[i] + lock[i] > 7) {
        break;
      }
      if (i === 4) {
        combinations++;
      }
    }
  }
}
console.log(combinations);
