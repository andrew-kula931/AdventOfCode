const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let initialY = 0;
let guardY = 0;
let initialX = 0;
let guardX = 0;
let total = 0;
let psudoCount = 0;
let currentSpace = "";
let guardFacing = "^";

function part1() {

  while (true) {
    try {
      
      if (guardFacing == "^") {
        if (guardY - 1 < 0) {
          return;
        }
        if (board[guardY - 1][guardX] != "#") {

          //Adding to count
          if (currentSpace != "X") {
            total++;
          }

          board[guardY][guardX] = "X";
          currentSpace = board[guardY - 1][guardX];
          board[guardY - 1][guardX] = "^";
          guardY--;
        } else {
          guardFacing = ">";
        }
      }

      if (guardFacing == ">") {
        if (board[guardY][guardX + 1] != "#") {

          //Adding to count
          if (currentSpace != "X") {
            total++;
          }

          board[guardY][guardX] = "X";
          currentSpace = board[guardY][guardX + 1];
          board[guardY][guardX + 1] = ">";
          guardX++;
        } else {
          guardFacing = "↓";
        }
      }

      if (guardFacing == "↓") {
        if (board[guardY + 1][guardX] != "#") {

          //Adding to count
          if (currentSpace != "X") {
            total++;
          }

          board[guardY][guardX] = "X";
          currentSpace = board[guardY + 1][guardX];
          board[guardY + 1][guardX] = ">";
          guardY++;
        } else {
          guardFacing = "<";
        }
      }

      if (guardFacing == "<") {
        if (guardX - 1 < 0) {
          return;
        }
        if (board[guardY][guardX - 1] != "#") {

          //Adding to count
          if (currentSpace != "X") {
            total++;
          }

          board[guardY][guardX] = "X";
          currentSpace = board[guardY][guardX - 1];
          board[guardY][guardX - 1] = ">";
          guardX--;
        } else {
          guardFacing = "^";
        }
      }

    } catch (e) {
      return;
    }
  }

}

function part2() {

  while (true) {
    try {
      if (guardFacing == "^") {
        if (guardY - 1 < 0) {
          return;
        }

        if (board[guardY - 1][guardX] != "#") {

          guardY--;

        } else {
          guardFacing = ">";
        }

        psudoCount++;
      }

      if (guardFacing == ">") {
        if (board[guardY][guardX + 1] != "#") {

          guardX++;

        } else {
          guardFacing = "↓";
        }

        psudoCount++;
      }

      if (guardFacing == "↓") {
        if (board[guardY + 1][guardX] != "#") {

          guardY++;

        } else {
          guardFacing = "<";
        }

        psudoCount++;
      }

      if (guardFacing == "<") {
        if (guardX - 1 < 0) {
          return;
        }
        if (board[guardY][guardX - 1] != "#") {

          guardX--;

        } else {
          guardFacing = "^";
        }

        psudoCount++;
      }

      if (psudoCount > 100000) {
        total++;
        return;
      }

      if (guardX > 1000) {
        return;
      }

      if (guardY > 1000) {
        return;
      }
    } catch (e) {
      return;
    }
  }

}

rl.on('line', function(input) {
  if (input.toLowerCase() == 'done') {
    for (let i = 0; i < board.length; i++) {
      for (let l = 0; l < board[i].length; l++) {
        if (board[i][l] == "#") {
          continue;
        } else if (board[i][l] == "^") {
          continue;
        }
        board[i][l] = "#";
        part2();
        psudoCount = 0;
        guardFacing = "^";
        guardX = initialX;
        guardY = initialY;
        board[i][l] = ".";
      }
    }
    console.log(total);
    rl.close();
  }

  let inputArray = input.split("");
  board.push(inputArray);

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == "^") {
      guardX = i;
      initialX = i;
      guardY = board.length - 1;
      initialY = board.length - 1;
    }
  }

});