var fs = require("fs");

const antinode = [];

function documentPoints(firstPointX, firstPointY, char) {
  let fillerX = firstPointX + 1;
  for (let y = firstPointY; y < board.length; y++) {
    for (let x = fillerX; x < board[y].length; x++) {
      if (board[y][x] == char) {
        let difX = x - firstPointX;
        let difY = y - firstPointY;
        let topX = firstPointX - difX;
        let topY = firstPointY - difY;
        let bottomX = x + difX;
        let bottomY = y + difY;
        let loc1 = `${firstPointX - difX}, ${firstPointY - difY}`;
        let loc2 = `${x + difX}, ${y + difY}`;

        if (
          !antinode.includes(loc1) &&
          topX >= 0 &&
          topX < board[0].length &&
          topY >= 0 &&
          topY < board.length
        ) {
          antinode.push(loc1);
        } else if (
          !antinode.includes(loc2) &&
          bottomX >= 0 &&
          bottomX < board[0].length &&
          bottomY >= 0 &&
          bottomY < board.length
        ) {
          antinode.push(loc2);
        }
      }
    }

    fillerX = 0;
  }
}

function documentPoints2(firstPointX, firstPointY, char) {
  let fillerX = firstPointX + 1;
  let starter = `${firstPointX}, ${firstPointY}`;
  if (!antinode.includes(starter)) {
    antinode.push(starter);
  }

  for (let y = firstPointY; y < board.length; y++) {
    for (let x = fillerX; x < board[y].length; x++) {
      if (board[y][x] == char) {
        let topX = 0;
        let topY = 0;
        let bottomX = 0;
        let bottomY = 0;
        let iteration = 1;
        let difX = x - firstPointX;
        let difY = y - firstPointY;

        starter = `${x}, ${y}`;
        if (!antinode.includes(starter)) {
          antinode.push(starter);
        }

        while (
          (topX >= 0 &&
            topX < board[0].length &&
            topY >= 0 &&
            topY < board.length) ||
          (bottomX >= 0 &&
            bottomX < board[0].length &&
            bottomY >= 0 &&
            bottomY < board.length)
        ) {
          topX = firstPointX - difX * iteration;
          topY = firstPointY - difY * iteration;
          bottomX = x + difX * iteration;
          bottomY = y + difY * iteration;
          let loc1 = `${topX}, ${topY}`;
          let loc2 = `${bottomX}, ${bottomY}`;

          if (
            !antinode.includes(loc1) &&
            topX >= 0 &&
            topX < board[0].length &&
            topY >= 0 &&
            topY < board.length
          ) {
            antinode.push(loc1);
          } else if (
            !antinode.includes(loc2) &&
            bottomX >= 0 &&
            bottomX < board[0].length &&
            bottomY >= 0 &&
            bottomY < board.length
          ) {
            antinode.push(loc2);
          }

          iteration++;
        }
      }
    }

    fillerX = 0;
  }
}

function part12(board) {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] != ".") {
        documentPoints2(x, y, board[y][x]);
      }
    }
  }
}

var filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

board = [];
lines.forEach(function (line) {
  const newLine = line.split("");
  board.push(newLine);
  part12(board);
});

console.log(antinode.length);
