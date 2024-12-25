//The test input checks for the 20 jump not the six

var fs = require("fs");

let total = 0;
let moves = Infinity;
const visited = new Map<string, number>();
const secondVisited = new Map<string, number>();
let checked: string[] = [];

function mapFinder(
  x: number,
  y: number,
  targetX: number,
  targetY: number,
  move: number
) {
  //Returns if at an invalid location
  if (board[y][x] === "#") {
    return;
  }

  //Returns if at the final location
  if (x === targetX && y === targetY) {
    visited.set(`${x},${y}`, move);
    if (move < moves) {
      moves = move;
    }
    return;
  }

  if (visited.has(`${x},${y}`)) {
    return;
  }

  visited.set(`${x},${y}`, move);

  let upCoords = [x, y - 1];
  let leftCoords = [x - 1, y];
  let rightCoords = [x + 1, y];
  let downCoords = [x, y + 1];

  //Recurses in every direction
  mapFinder(rightCoords[0], rightCoords[1], targetX, targetY, move + 1);
  mapFinder(downCoords[0], downCoords[1], targetX, targetY, move + 1);
  mapFinder(leftCoords[0], leftCoords[1], targetX, targetY, move + 1);
  mapFinder(upCoords[0], upCoords[1], targetX, targetY, move + 1);
}

function wallHopper(x: number, y: number, move: number) {
  //Returns if at an invalid location
  if (board[y][x] === "#") {
    return;
  }

  if (secondVisited.has(`${x},${y}`)) {
    return;
  }

  secondVisited.set(`${x},${y}`, move);
  checked = [];
  cheatCheck(x, y, move, 0, false);

  let upCoords = [x, y - 1];
  let leftCoords = [x - 1, y];
  let rightCoords = [x + 1, y];
  let downCoords = [x, y + 1];

  //Recurses in every direction
  wallHopper(rightCoords[0], rightCoords[1], move + 1);
  wallHopper(downCoords[0], downCoords[1], move + 1);
  wallHopper(leftCoords[0], leftCoords[1], move + 1);
  wallHopper(upCoords[0], upCoords[1], move + 1);
}

function cheatCheck(
  x: number,
  y: number,
  move: number,
  iteration: number,
  hasCheated: boolean
) {
  if (iteration > 7) {
    return;
  }

  if (x == 0 || x == board[0].length - 1 || y == 0 || y == board.length - 1) {
    return;
  }

  if (checked.includes(`${x},${y}`)) {
    return;
  }

  if (visited.has(`${x},${y}`)) {
    if (visited.get(`${x},${y}`)! > move + 71) {
      console.log(x, y);
      total++;
    }
  }

  if (board[y][x] !== "#") {
    checked.push(`${x},${y}`);
  }

  let upCoords = [x, y - 1];
  let leftCoords = [x - 1, y];
  let rightCoords = [x + 1, y];
  let downCoords = [x, y + 1];

  cheatCheck(upCoords[0], upCoords[1], move + 1, iteration + 1, hasCheated);
  cheatCheck(leftCoords[0], leftCoords[1], move + 1, iteration + 1, hasCheated);
  cheatCheck(
    rightCoords[0],
    rightCoords[1],
    move + 1,
    iteration + 1,
    hasCheated
  );
  cheatCheck(downCoords[0], downCoords[1], move + 1, iteration + 1, hasCheated);
}

var filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

const board: string[][] = [];
let y = 0;
let startX;
let startY;
let targetX;
let targetY;
lines.forEach(function (line) {
  for (let x = 0; x < line.length - 1; x++) {
    if (line[x] === "S") {
      startX = x;
      startY = y;
    } else if (line[x] === "E") {
      targetX = x;
      targetY = y;
    }
  }
  board.push(line.split(""));
  y++;
});

mapFinder(startX, startY, targetX, targetY, 0);
wallHopper(startX, startY, 0);
console.log(total);
//const totalMoves = moves;
/*
for (let y = 1; y < board.length - 1; y++) {
  for (let x = 1; x < board[y].length - 1; x++) {
    if (board[y][x] != "#") {
      continue;
    }
    board[y][x] = ".";
    moves = Infinity;
    let visited = new Set<string>();
    mapFinder(
      startX,
      startY,
      targetX,
      targetY,
      0,
    );
    if (moves <= totalMoves - 100) {
      total++;
    }
    board[y][x] = "#";
    console.log(`${x},${y}`);
  }
}
*/
