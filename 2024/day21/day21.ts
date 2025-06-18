var fs = require("fs");

let total = 0;

const keyPad = new Map<string, number[]>([
  ["7", [0, 0]],
  ["8", [1, 0]],
  ["9", [2, 0]],
  ["4", [0, 1]],
  ["5", [1, 1]],
  ["6", [2, 1]],
  ["1", [0, 2]],
  ["2", [1, 2]],
  ["3", [2, 2]],
  ["0", [1, 3]],
  ["A", [2, 3]],
]);

const dirPad = new Map<string, number[]>([
  ["^", [1, 0]],
  ["A", [2, 0]],
  ["<", [0, 1]],
  ["v", [1, 1]],
  [">", [2, 1]],
]);

function keyOperation(code: string) {
  const codeList = code.split("");
  let x = 2;
  let y = 3;
  let movements: string = "";

  for (let num of codeList) {
    //Find the distances
    let coord = keyPad.get(num);
    let changeX = coord![0] - x;
    let changeY = coord![1] - y;

    //Add the corresponding characters to the list
    //Negative X = < | Negative Y = ^
    if (changeY + y != 0) {
      for (let y = 0; y < Math.abs(changeY); y++) {
        movements += changeY > 0 ? "v" : "^";
      }
      for (let x = 0; x < Math.abs(changeX); x++) {
        movements += changeX > 0 ? ">" : "<";
      }
    } else {
      for (let x = 0; x < Math.abs(changeX); x++) {
        movements += changeX > 0 ? ">" : "<";
      }
      for (let y = 0; y < Math.abs(changeY); y++) {
        movements += changeY > 0 ? "v" : "^";
      }
    }

    //Add an A
    movements += "A";

    //Reset the position
    x = coord![0];
    y = coord![1];
  }

  return movements;
}

function dirOperation(code: string) {
  const codeList = code.split("");
  let x = 2;
  let y = 0;
  let movements: string = "";

  for (let move of codeList) {
    //Find the distances
    let coord = dirPad.get(move);
    let changeX = coord![0] - x;
    let changeY = coord![1] - y;

    //Add the corresponding characters to the list
    //Negative X = < | Negative Y = ^
    if (changeY + y != 0) {
      for (let y = 0; y < Math.abs(changeY); y++) {
        movements += changeY > 0 ? "v" : "^";
      }
      for (let x = 0; x < Math.abs(changeX); x++) {
        movements += changeX > 0 ? ">" : "<";
      }
    } else {
      for (let x = 0; x < Math.abs(changeX); x++) {
        movements += changeX > 0 ? ">" : "<";
      }
      for (let y = 0; y < Math.abs(changeY); y++) {
        movements += changeY > 0 ? "v" : "^";
      }
    }

    //Add an A
    movements += "A";

    //Reset the position
    x = coord![0];
    y = coord![1];
  }

  return movements;
}

function part1(code: string) {
  const codeList = code.split("");
  let numList = codeList;
  numList.pop();
  const codesNum = numList.join("");

  let key = keyOperation(code);
  console.log(key);
  let move1 = dirOperation(key);
  console.log(move1);
  let move2 = dirOperation(move1);

  console.log(move2);
  console.log(codesNum, move2.length);
  total += Number(codesNum) * move2.length;
}

function part2(code: string) {
  const codeList = code.split("");
  let numList = codeList;
  numList.pop();
  const codesNum = numList.join("");

  let key = keyOperation(code);
  let zero = 0;
  let move;
  for (let i = 0; i < 25; i++) {
    if (zero === 0) {
      console.log("Running even");
      move = dirOperation(key);
      zero = 1;
    } else {
      console.log("Running odd");
      key = dirOperation(move);
      zero = 0;
    }
  }

  console.log(codesNum, move.length);
  total += Number(codesNum) * move.length;
}

var filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

lines.forEach(function (line) {
  part2(line);
});
console.log(total);
