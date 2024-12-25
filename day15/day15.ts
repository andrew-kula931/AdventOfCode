var fs = require("fs");

let total = 0;

interface Changing {
  key1: string;
  key2: string;
  locations1: number[][];
  locations2: number[][];
}

interface Position {
  x: number;
  y: number;
}

function move(fishX: number, fishY: number, direction: string) {
  let tempX = fishX;
  let tempY = fishY;
  let moved = false;
  let returnSpots: number[][] = [];
  const fishPos = { x: fishX, y: fishY };
  const changing: Changing = {
    key1: "[",
    key2: "]",
    locations1: [],
    locations2: [],
  };
  const changedSpots: Changing = {
    key1: "[",
    key2: "]",
    locations1: [],
    locations2: [],
  };
  switch (direction) {
    case "^":
      while (true) {
        if (board[tempY - 1][tempX] == "[") {
          tempY--;
          if (
            !changedSpots.locations2.some((arr) =>
              arr.every((value, index) => value === [tempX + 1, tempY][index])
            )
          ) {
            returnSpots.push([tempX + 1, tempY + 1]);
          }
          changing.locations1.push([tempX, tempY - 1]);
          board[tempY][tempX] = ".";
          changedSpots.locations1.push([tempX, tempY]);
          moved = true;
          continue;
        } else if (board[tempY - 1][tempX] == "]") {
          tempY--;
          if (
            !changedSpots.locations1.some((arr) =>
              arr.every((value, index) => value === [tempX - 1, tempY][index])
            )
          ) {
            returnSpots.push([tempX - 1, tempY + 1]);
          }
          changing.locations2.push([tempX, tempY - 1]);
          board[tempY][tempX] = ".";
          changedSpots.locations2.push([tempX, tempY]);
          moved = true;
          continue;
        } else if (board[tempY - 1][tempX] == "#") {
          for (let spot of changedSpots.locations1) {
            board[spot[1]][spot[0]] = changedSpots.key1;
          }
          for (let spot of changedSpots.locations2) {
            board[spot[1]][spot[0]] = changedSpots.key2;
          }
          return fishPos;
        } else {
          if (returnSpots.length != 0) {
            tempX = returnSpots[0][0];
            tempY = returnSpots[0][1];
            returnSpots.shift();
            continue;
          }
          moved = true;
          break;
        }
      }
      for (let item of changing.locations1) {
        board[item[1]][item[0]] = changing.key1;
      }
      for (let item of changing.locations2) {
        board[item[1]][item[0]] = changing.key2;
      }
      if (moved) {
        board[fishY - 1][fishX] = "@";
        board[fishY][fishX] = ".";
      }
      tempX = fishX;
      tempY = fishY - 1;
      break;
    case "<":
      while (true) {
        if (board[fishY][tempX - 1] == "]") {
          tempX -= 2;
          moved = true;
          continue;
        } else if (board[fishY][tempX - 1] == "#") {
          return fishPos;
        } else {
          tempX--;
          moved = true;
          break;
        }
      }
      while (tempX < fishX - 1) {
        board[fishY][tempX] = "[";
        board[fishY][tempX + 1] = "]";
        tempX += 2;
      }
      if (moved) {
        board[fishY][tempX] = "@";
        board[fishY][fishX] = ".";
      }
      break;
    case "v":
      while (true) {
        if (board[tempY + 1][tempX] == "[") {
          tempY++;
          if (
            !changedSpots.locations2.some((arr) =>
              arr.every((value, index) => value === [tempX + 1, tempY][index])
            )
          ) {
            returnSpots.push([tempX + 1, tempY - 1]);
          }
          changing.locations1.push([tempX, tempY + 1]);
          board[tempY][tempX] = ".";
          changedSpots.locations1.push([tempX, tempY]);
          moved = true;
          continue;
        } else if (board[tempY + 1][tempX] == "]") {
          tempY++;
          if (
            !changedSpots.locations1.some((arr) =>
              arr.every((value, index) => value === [tempX - 1, tempY][index])
            )
          ) {
            returnSpots.push([tempX - 1, tempY - 1]);
          }
          changing.locations2.push([tempX, tempY + 1]);
          board[tempY][tempX] = ".";
          changedSpots.locations2.push([tempX, tempY]);
          moved = true;
          continue;
        } else if (board[tempY + 1][tempX] == "#") {
          for (let spot of changedSpots.locations1) {
            board[spot[1]][spot[0]] = changedSpots.key1;
          }
          for (let spot of changedSpots.locations2) {
            board[spot[1]][spot[0]] = changedSpots.key2;
          }
          return fishPos;
        } else {
          if (returnSpots.length != 0) {
            tempX = returnSpots[0][0];
            tempY = returnSpots[0][1];
            returnSpots.shift();
            continue;
          }
          moved = true;
          break;
        }
      }
      for (let item of changing.locations1) {
        board[item[1]][item[0]] = changing.key1;
      }
      for (let item of changing.locations2) {
        board[item[1]][item[0]] = changing.key2;
      }
      if (moved) {
        board[fishY + 1][fishX] = "@";
        board[fishY][fishX] = ".";
      }
      tempX = fishX;
      tempY = fishY + 1;
      break;
    case ">":
      while (true) {
        if (board[fishY][tempX + 1] == "[") {
          tempX += 2;
          moved = true;
          continue;
        } else if (board[fishY][tempX + 1] == "#") {
          return fishPos;
        } else {
          tempX++;
          moved = true;
          break;
        }
      }
      while (tempX > fishX + 1) {
        board[fishY][tempX] = "]";
        board[fishY][tempX - 1] = "[";
        tempX -= 2;
      }
      if (moved) {
        board[fishY][tempX] = "@";
        board[fishY][fishX] = ".";
      }
      break;
  }
  fishPos.x = tempX;
  fishPos.y = tempY;
  return fishPos;
}

function part1(board, movement) {
  let fish: Position = {
    x: 0,
    y: 0,
  };
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === "@") {
        fish.x = x;
        fish.y = y;
      }
    }
  }

  for (let m = 0; m < movement.length; m++) {
    /*
    if (m > 180 && m < 210) {
      board.forEach((x) => {
        console.log(x.join(""));
      });
      console.log(movement[m]);
    }
    */
    fish = move(fish.x, fish.y, movement[m]);
  }

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === "[") {
        total += y * 100 + x;
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

const board: String[][] = [];
let movement: string = "";

lines.forEach(function (line) {
  let newLine = "";

  for (let l = 0; l < line.length; l++) {
    if (line[l] == "#") {
      newLine = newLine + "##";
    } else if (line[l] == ".") {
      newLine = newLine + "..";
    } else if (line[l] == "O") {
      newLine = newLine + "[]";
    } else {
      newLine = newLine + "@.";
    }
  }

  let splitLine = newLine.split("");
  if (splitLine[0] === "#") {
    board.push(splitLine);
  } else {
    movement = movement + line;
  }
});

part1(board, movement);
console.log(total);
