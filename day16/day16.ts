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
const scores: Map<Vector, number> = new Map();

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
  if (scores.has(vector) && scores.get(vector)! >= score) {
    return;
  }

  scores.set({ point, direction }, score);

  let forwardPosition = point;
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
  dfs(board, point, target, direction, score + 1);
  dfs(board, point, target, direction, score + 1);
}

function part1(board: string[][], initial: Point, target: Point) {
  dfs(board, initial, target, Direction.RIGHT, 0);

  let best = Infinity;
  let endScores = Array.from(scores.entries()).filter(
    ([state, score]) => state.point.x == target.x && state.point.y == target.y
  );
  for (let [state, score] of endScores) {
    if (best > score) {
      best = score;
    }
  }

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
console.log(part1(board, start, end));
