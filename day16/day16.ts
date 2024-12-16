var fs = require("fs");

let total = 0;
let failedPaths: Failed[] = [];
let visitedLocations: Map<string, Directions> = new Map();
const correctTotals: number[] = [];

enum Directions {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  BLOCK,
}

interface Failed {
  total: number;
  direction: Directions;
  directions: Directions[];
  location: number[];
}

function checkArray(x, y, direction: Directions) {
  const key = `${x},${y}`;
  if (visitedLocations.has(key)) {
    return false;
  }
  return true;
}

function createEntry(
  total: number,
  direction: Directions,
  directions: Directions[],
  x: number,
  y: number
) {
  const newFailed: Failed = {
    total: total,
    direction: direction,
    directions: directions,
    location: [x, y],
  };
  return newFailed;
}

function checkDirections(
  direction: Directions,
  board,
  deerX: number,
  deerY: number
) {
  let direct: Directions[] = [];
  switch (direction) {
    case Directions.UP:
      if (
        board[deerY][deerX - 1] != "#" &&
        checkArray(deerX - 1, deerY, direction)
      ) {
        direct.push(Directions.LEFT);
      }
      if (
        board[deerY][deerX + 1] != "#" &&
        checkArray(deerX + 1, deerY, direction)
      ) {
        direct.push(Directions.RIGHT);
      }
      if (
        board[deerY - 1][deerX] != "#" &&
        checkArray(deerX, deerY - 1, direction)
      ) {
        direct.push(Directions.UP);
      }
      break;
    case Directions.LEFT:
      if (
        board[deerY + 1][deerX] != "#" &&
        checkArray(deerX, deerY + 1, direction)
      ) {
        direct.push(Directions.DOWN);
      }
      if (
        board[deerY - 1][deerX] != "#" &&
        checkArray(deerX, deerY - 1, direction)
      ) {
        direct.push(Directions.UP);
      }
      if (
        board[deerY][deerX - 1] != "#" &&
        checkArray(deerX - 1, deerY, direction)
      ) {
        direct.push(Directions.LEFT);
      }
      break;
    case Directions.RIGHT:
      if (
        board[deerY - 1][deerX] != "#" &&
        checkArray(deerX, deerY - 1, direction)
      ) {
        direct.push(Directions.UP);
      }
      if (
        board[deerY + 1][deerX] != "#" &&
        checkArray(deerX, deerY + 1, direction)
      ) {
        direct.push(Directions.DOWN);
      }
      if (
        board[deerY][deerX + 1] != "#" &&
        checkArray(deerX + 1, deerY, direction)
      ) {
        direct.push(Directions.RIGHT);
      }
      break;
    case Directions.DOWN:
      if (
        board[deerY][deerX + 1] != "#" &&
        checkArray(deerX + 1, deerY, direction)
      ) {
        direct.push(Directions.RIGHT);
      }
      if (
        board[deerY][deerX - 1] != "#" &&
        checkArray(deerX - 1, deerY, direction)
      ) {
        direct.push(Directions.LEFT);
      }
      if (
        board[deerY + 1][deerX] != "#" &&
        checkArray(deerX, deerY + 1, direction)
      ) {
        direct.push(Directions.DOWN);
      }
      break;
  }
  if (direct.length > 1) {
    failedPaths.push(createEntry(total, direction, direct, deerX, deerY));
    visitedLocations.set(`${deerX},${deerY}`, direction);
    return direct[0];
  } else if (direct.length == 1) {
    return direct[0];
  }
  return Directions.BLOCK;
}

function part1(board) {
  let deerX = 1;
  let deerY = board.length - 2;
  let direction: Directions = Directions.RIGHT;
  while (true) {
    console.log(deerX, deerY);
    let check: Directions = checkDirections(direction, board, deerX, deerY);
    total += check == direction ? 1 : 1000;
    let filteredFails = failedPaths.filter((x) => x.directions.length > 0);
    if (check == Directions.BLOCK) {
      try {
        let index: number = filteredFails.length - 1;
        deerX = filteredFails[index].location[0];
        deerY = filteredFails[index].location[1];
        direction = filteredFails[index].directions[0];
        check = direction;
        filteredFails[index].directions.shift();
        total = filteredFails[index].total;
        console.log("resetting total: ", total);
      } catch (e) {
        break;
      }
    } else {
      direction = check;
    }
    switch (check) {
      case Directions.UP:
        deerY--;
        break;
      case Directions.LEFT:
        deerX--;
        break;
      case Directions.RIGHT:
        deerX++;
        break;
      case Directions.DOWN:
        deerY++;
        break;
      default:
        console.log("Caught a block in the movment switch");
    }
    if (deerX == board[1].length - 2 && deerY == 1) {
      correctTotals.push(total + 1);
      console.log(correctTotals);
    }
    if (filteredFails.length != 0) {
      continue;
    }
    if (deerX == board[1].length - 2 && deerY == 1) {
      break;
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

const board: string[][] = [];

lines.forEach(function (line) {
  board.push(line.split(""));
});

part1(board);
console.log(correctTotals);
for (let element of correctTotals) {
  if (element < total) {
    total = element;
  }
}
console.log(total);
