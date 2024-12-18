var fs = require("fs");

interface Point {
  x: number;
  y: number;
}

interface Vector {
  point: Point;
  direction: Direction;
}

let total = 0;
const scores: Map<string, number> = new Map();
const queue: string[] = [];
const found: number[][] = [];

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

function createKey(vector: Vector): string {
  return `${vector.point.x},${vector.point.y},${vector.direction}`;
}

function dfs(
  board,
  point: Point,
  target: Point,
  direction: Direction,
  score: number
) {
  if (board[point.y][point.x] === "#") {
    return;
  }

  let vector: Vector = { point, direction };
  let key = createKey(vector);

  if (scores.has(key) && scores.get(key)! < score) {
    return;
  }

  scores.set(key, score);

  let forwardPosition = { ...point };
  let leftDirection;
  let rightDirection;

  switch (direction) {
    case Direction.UP:
      forwardPosition = { x: point.x, y: point.y - 1 };
      leftDirection = Direction.LEFT;
      rightDirection = Direction.RIGHT;
      break;
    case Direction.DOWN:
      forwardPosition = { x: point.x, y: point.y + 1 };
      leftDirection = Direction.RIGHT;
      rightDirection = Direction.LEFT;
      break;
    case Direction.LEFT:
      forwardPosition = { x: point.x - 1, y: point.y };
      leftDirection = Direction.DOWN;
      rightDirection = Direction.UP;
      break;
    case Direction.RIGHT:
      forwardPosition = { x: point.x + 1, y: point.y };
      leftDirection = Direction.UP;
      rightDirection = Direction.DOWN;
      break;
  }

  //Recursion
  dfs(board, forwardPosition, target, direction, score + 1);
  dfs(board, point, target, leftDirection, score + 1000);
  dfs(board, point, target, rightDirection, score + 1000);
}

function checkDirections(
  x: number,
  y: number,
  direction: number,
  best: number
) {
  switch (direction) {
    case 0:
      y--;
    case 1:
      y++;
    case 2:
      x--;
    case 3:
      x++;
  }

  let pos: string = `${x},${y},`;
  scores.forEach((score, key) => {
    if (key.startsWith(pos)) {
      if (score == best - 1) {
        found.push([x, y]);
        queue.push(pos + direction);
      }
      if (score == best - 1000) {
        found.push([x, y]);
        queue.push(pos + direction);
      }
    }
  });
}

function part2() {
  let best = part1(board, start, end);
  scores.forEach((score, key) => {
    if (score === best) {
      queue.push(key);
    }
  });

  found.push([board[1].length - 2, 1]);

  while (queue.length > 0) {
    const top = queue[0];
    const [x, y, dir] = top.split(",");
    queue.shift();

    const score = scores[top];

    checkDirections(Number(x), Number(y), 0, score);
    checkDirections(Number(x), Number(y), 1, score);
    checkDirections(Number(x), Number(y), 2, score);
    checkDirections(Number(x), Number(y), 3, score);

    queue.shift();
  }

  const trueBoard: Boolean[][] = [];
  for (let i = 0; i < board.length; i++) {
    let row: Boolean[] = [];
    for (let m = 0; m < board[i].length; m++) {
      row.push(false);
    }
    trueBoard.push(row);
  }

  found.forEach(([x, y]) => {
    trueBoard[y][x] = true;
  });

  let count = 0;
  for (let i = 0; i < trueBoard.length; i++) {
    for (let m = 0; m < trueBoard[i].length; m++) {
      if (trueBoard[i][m]) {
        count++;
      }
    }
  }

  return count;
}

function part1(board: string[][], initial: Point, target: Point) {
  dfs(board, initial, target, Direction.RIGHT, 0);

  const position = `${board[1].length - 2},${1},`;

  let best = Infinity;
  scores.forEach((score, key) => {
    if (key.startsWith(position)) {
      if (score < best) {
        best = score;
      }
    }
  });

  return best;
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

const start: Point = {
  x: 1,
  y: board.length - 2,
};
const end: Point = {
  x: board[1].length - 2,
  y: 1,
};
console.log(part2());
