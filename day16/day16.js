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
var queue = [];
var found = [];
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
function checkDirections(x, y, direction, best) {
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
    var pos = "".concat(x, ",").concat(y, ",");
    scores.forEach(function (score, key) {
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
    var best = part1(board, start, end);
    scores.forEach(function (score, key) {
        if (score === best) {
            queue.push(key);
        }
    });
    found.push([board[1].length - 2, 1]);
    while (queue.length > 0) {
        var top_1 = queue[0];
        var _a = top_1.split(","), x = _a[0], y = _a[1], dir = _a[2];
        queue.shift();
        var score = scores[top_1];
        checkDirections(Number(x), Number(y), 0, score);
        checkDirections(Number(x), Number(y), 1, score);
        checkDirections(Number(x), Number(y), 2, score);
        checkDirections(Number(x), Number(y), 3, score);
        queue.shift();
    }
    var trueBoard = [];
    for (var i = 0; i < board.length; i++) {
        var row = [];
        for (var m = 0; m < board[i].length; m++) {
            row.push(false);
        }
        trueBoard.push(row);
    }
    found.forEach(function (_a) {
        var x = _a[0], y = _a[1];
        trueBoard[y][x] = true;
    });
    var count = 0;
    for (var i = 0; i < trueBoard.length; i++) {
        for (var m = 0; m < trueBoard[i].length; m++) {
            if (trueBoard[i][m]) {
                count++;
            }
        }
    }
    return count;
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
console.log(part2());
