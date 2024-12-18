var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var fs = require("fs");
var total = 0;
var scores = new Map();
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
function createKey(vector) {
    return "".concat(vector.point.x, ",").concat(vector.point.y, ",").concat(vector.direction);
}
function dfs(board, point, target, direction, score) {
    if (board[point.y][point.x] === "#") {
        return;
    }
    var vector = { point: point, direction: direction };
    var key = createKey(vector);
    if (scores.has(key) && scores.get(key) < score) {
        return;
    }
    scores.set(key, score);
    var forwardPosition = __assign({}, point);
    var leftDirection;
    var rightDirection;
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
function part1(board, initial, target) {
    dfs(board, initial, target, Direction.RIGHT, 0);
    var position = "".concat(board[1].length - 2, ",").concat(1, ",");
    var best = Infinity;
    scores.forEach(function (score, key) {
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
var board = [];
lines.forEach(function (line) {
    board.push(line.split(""));
});
var start = {
    x: 1,
    y: board.length - 2,
};
var end = {
    x: board[1].length - 2,
    y: 1,
};
console.log(part1(board, start, end));
