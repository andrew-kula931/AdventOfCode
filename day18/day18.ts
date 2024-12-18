var fs = require("fs");

let moves: number = Infinity;
const pos: number[] = [0, 0];
let visited: Map<string, number> = new Map();

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

function part1(x: number, y: number, move: number) {
  //Returns if at an invalid location
  if (x < 0 || x > 70 || y < 0 || y > 70) {
    return;
  }

  if (board[y][x] === "#") {
    return;
  }

  visited.set(`${x},${y}`, move);
  //Returns if at the final location
  if (x === 70 && y === 70) {
    if (move < moves) {
      moves = move;
    }
    return;
  }

  let upCoords = [x, y - 1];
  let leftCoords = [x - 1, y];
  let rightCoords = [x + 1, y];
  let downCoords = [x, y + 1];

  //Recurses in every direction
  if (
    !visited.has(`${rightCoords[0]},${rightCoords[1]}`) ||
    visited.get(`${rightCoords[0]},${rightCoords[1]}`)! > move + 1
  ) {
    part1(rightCoords[0], rightCoords[1], move + 1);
  }
  if (
    !visited.has(`${downCoords[0]},${downCoords[1]}`) ||
    visited.get(`${downCoords[0]},${downCoords[1]}`)! > move + 1
  ) {
    part1(downCoords[0], downCoords[1], move + 1);
  }
  if (
    !visited.has(`${leftCoords[0]},${leftCoords[1]}`) ||
    visited.get(`${leftCoords[0]},${leftCoords[1]}`)! > move + 1
  ) {
    part1(leftCoords[0], leftCoords[1], move + 1);
  }
  if (
    !visited.has(`${upCoords[0]},${upCoords[1]}`) ||
    visited.get(`${upCoords[0]},${upCoords[1]}`)! > move + 1
  ) {
    part1(upCoords[0], upCoords[1], move + 1);
  }
}

//Create the board
const board: string[][] = [];
for (let i = 0; i < 71; i++) {
  const row: string[] = [];
  for (let l = 0; l < 71; l++) {
    row.push(".");
  }
  board.push(row);
}

var filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

let bytes = 0;
lines.forEach(function (line) {
  moves = Infinity;
  visited = new Map();
  console.log(line);
  let spot = line.split(",");
  board[Number(spot[1])][Number(spot[0])] = "#";
  part1(0, 0, 0);
  console.log(moves);
  /*
  if (bytes < 1024) {
    let spot = line.split(",");
    console.log(spot);
    board[Number(spot[1])][Number(spot[0])] = "#";
    bytes++;
  }
  */
});

//console.log(moves);
/*
for (let i = 0; i < 70; i++) {
  let str = "";
  for (let l = 0; l < 70; l++) {
    if (visited.has(`${l},${i}`)) {
      str += visited.get(`${l},${i}`)?.toString().padStart(3, "0") + " ";
    } else {
      str += "    ";
    }
  }
  console.log(str);
}
*/
