var fs = require("fs");

const board = [];
let total = 0;


function checkTrailHead(board, xCoord, yCoord) {
  const endings = [];
  let nextStep1 = [];
  nextStep1.push([xCoord,yCoord]);
  let nextStep2 = [];

  for (let i = 1; i < 10; i++) {
    if (i % 2 != 0) {
      for (let l = 0; l < nextStep1.length; l++) {
        //Check above
        if (nextStep1[l][1] != 0) {
          if (board[Number(nextStep1[l][1]) - 1][nextStep1[l][0]] == i) {
            nextStep2.push([(nextStep1[l][0]),Number(nextStep1[l][1] - 1)]);
          }
        }

        //Check right
        if (nextStep1[l][0] != board[0].length - 1) {
          if (board[nextStep1[l][1]][Number(nextStep1[l][0]) + 1] == i) {
            nextStep2.push([(Number(nextStep1[l][0]) + 1),(nextStep1[l][1])]);
          }
        }

        //Check left
        if (nextStep1[l][0] != 0) {
          if (board[nextStep1[l][1]][Number(nextStep1[l][0]) - 1] == i) {
            nextStep2.push([(Number(nextStep1[l][0]) - 1),(nextStep1[l][1])]);
          }
        }

        //Check below
        if (nextStep1[l][1] != board.length - 1) {
          if (board[Number(nextStep1[l][1]) + 1][nextStep1[l][0]] == i) {
            nextStep2.push([nextStep1[l][0],(Number(nextStep1[l][1]) + 1)]);
          }
        }
      }

      nextStep1 = [];

    } else {
      for (let l = 0; l < nextStep2.length; l++) {
        //Check above
        if (nextStep2[l][1] != 0) {
          if (board[Number(nextStep2[l][1]) - 1][nextStep2[l][0]] == i) {
            nextStep1.push([nextStep2[l][0],(Number(nextStep2[l][1]) - 1)]);
          }
        }

        //Check right
        if (nextStep2[l][0] != board[0].length - 1) {
          if (board[nextStep2[l][1]][Number(nextStep2[l][0]) + 1] == i) {
            nextStep1.push([(Number(nextStep2[l][0]) + 1),nextStep2[l][1]]);
          }
        }

        //Check left
        if (nextStep2[l][0] != 0) {
          if (board[nextStep2[l][1]][Number(nextStep2[l][0]) - 1] == i) {
            nextStep1.push([(Number(nextStep2[l][0]) - 1),nextStep2[l][1]]);
          }
        }

        //Check below
        if (nextStep2[l][1] != board.length - 1) {
          if (board[Number(nextStep2[l][1]) + 1][nextStep2[l][0]] == i) {
            nextStep1.push([nextStep2[l][0],(Number(nextStep2[l][1]) + 1)]);
          }
        }
      }

      nextStep2 = [];

    }
  }

  /*

  This was the code used for part 1

  nextStep2.forEach((element) => {
    const [x, y] = element;
    const key = `${y}, ${x}`

    if (!endings.includes(key)) {
      endings.push(key);
    }
  });
  total += endings.length;
  */

  //Only for part 2
  total += nextStep2.length;
}

function part1(board) {

  for (let i = 0; i < board.length; i++) {
    for (let x = 0; x < board[i].length; x++) {
      if (board[i][x] == 0) {
        checkTrailHead(board, x, i);
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

lines.forEach(function (line) {
  let splitLine = line.split("");
  board.push(splitLine);
});

part1(board);
console.log(total);