var fs = require("fs");
var total = 0;
var moves = Infinity;
var visited = new Map();
var secondVisited = new Map();
var checked = [];
function mapFinder(x, y, targetX, targetY, move) {
    //Returns if at an invalid location
    if (board[y][x] === "#") {
        return;
    }
    //Returns if at the final location
    if (x === targetX && y === targetY) {
        visited.set("".concat(x, ",").concat(y), move);
        if (move < moves) {
            moves = move;
        }
        return;
    }
    if (visited.has("".concat(x, ",").concat(y))) {
        return;
    }
    visited.set("".concat(x, ",").concat(y), move);
    var upCoords = [x, y - 1];
    var leftCoords = [x - 1, y];
    var rightCoords = [x + 1, y];
    var downCoords = [x, y + 1];
    //Recurses in every direction
    mapFinder(rightCoords[0], rightCoords[1], targetX, targetY, move + 1);
    mapFinder(downCoords[0], downCoords[1], targetX, targetY, move + 1);
    mapFinder(leftCoords[0], leftCoords[1], targetX, targetY, move + 1);
    mapFinder(upCoords[0], upCoords[1], targetX, targetY, move + 1);
}
function wallHopper(x, y, move) {
    //Returns if at an invalid location
    if (board[y][x] === "#") {
        return;
    }
    if (secondVisited.has("".concat(x, ",").concat(y))) {
        return;
    }
    secondVisited.set("".concat(x, ",").concat(y), move);
    checked = [];
    cheatCheck(x, y, move, 0, false);
    var upCoords = [x, y - 1];
    var leftCoords = [x - 1, y];
    var rightCoords = [x + 1, y];
    var downCoords = [x, y + 1];
    //Recurses in every direction
    wallHopper(rightCoords[0], rightCoords[1], move + 1);
    wallHopper(downCoords[0], downCoords[1], move + 1);
    wallHopper(leftCoords[0], leftCoords[1], move + 1);
    wallHopper(upCoords[0], upCoords[1], move + 1);
}
function cheatCheck(x, y, move, iteration, hasCheated) {
    if (iteration > 6) {
        return;
    }
    if (x == 0 || x == board[0].length - 1 || y == 0 || y == board.length - 1) {
        return;
    }
    if (checked.includes("".concat(x, ",").concat(y))) {
        return;
    }
    if (visited.has("".concat(x, ",").concat(y))) {
        if (visited.get("".concat(x, ",").concat(y)) > move + 71) {
            console.log(x, y);
            total++;
        }
    }
    if (board[y][x] !== "#") {
        checked.push("".concat(x, ",").concat(y));
    }
    var upCoords = [x, y - 1];
    var leftCoords = [x - 1, y];
    var rightCoords = [x + 1, y];
    var downCoords = [x, y + 1];
    cheatCheck(upCoords[0], upCoords[1], move + 1, iteration + 1, hasCheated);
    cheatCheck(leftCoords[0], leftCoords[1], move + 1, iteration + 1, hasCheated);
    cheatCheck(rightCoords[0], rightCoords[1], move + 1, iteration + 1, hasCheated);
    cheatCheck(downCoords[0], downCoords[1], move + 1, iteration + 1, hasCheated);
}
var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);
var board = [];
var y = 0;
var startX;
var startY;
var targetX;
var targetY;
lines.forEach(function (line) {
    for (var x = 0; x < line.length - 1; x++) {
        if (line[x] === "S") {
            startX = x;
            startY = y;
        }
        else if (line[x] === "E") {
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
