var fs = require("fs");
var moves = Infinity;
var pos = [0, 0];
var visited = new Map();
var foundEnd = true;
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
function part1(x, y, move) {
    //Returns if at an invalid location
    if (x < 0 || x > 70 || y < 0 || y > 70) {
        return;
    }
    if (board[y][x] === "#") {
        return;
    }
    visited.set("".concat(x, ",").concat(y), move);
    //Returns if at the final location
    if (x === 70 && y === 70) {
        if (move < moves) {
            moves = move;
        }
        return;
    }
    var upCoords = [x, y - 1];
    var leftCoords = [x - 1, y];
    var rightCoords = [x + 1, y];
    var downCoords = [x, y + 1];
    //Recurses in every direction
    if (!visited.has("".concat(rightCoords[0], ",").concat(rightCoords[1])) ||
        visited.get("".concat(rightCoords[0], ",").concat(rightCoords[1])) > move + 1) {
        part1(rightCoords[0], rightCoords[1], move + 1);
    }
    if (!visited.has("".concat(downCoords[0], ",").concat(downCoords[1])) ||
        visited.get("".concat(downCoords[0], ",").concat(downCoords[1])) > move + 1) {
        part1(downCoords[0], downCoords[1], move + 1);
    }
    if (!visited.has("".concat(leftCoords[0], ",").concat(leftCoords[1])) ||
        visited.get("".concat(leftCoords[0], ",").concat(leftCoords[1])) > move + 1) {
        part1(leftCoords[0], leftCoords[1], move + 1);
    }
    if (!visited.has("".concat(upCoords[0], ",").concat(upCoords[1])) ||
        visited.get("".concat(upCoords[0], ",").concat(upCoords[1])) > move + 1) {
        part1(upCoords[0], upCoords[1], move + 1);
    }
}
//Create the board
var board = [];
for (var i = 0; i < 71; i++) {
    var row = [];
    for (var l = 0; l < 71; l++) {
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
var bytes = 0;
lines.forEach(function (line) {
    moves = Infinity;
    visited = new Map();
    console.log(line);
    var spot = line.split(",");
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
