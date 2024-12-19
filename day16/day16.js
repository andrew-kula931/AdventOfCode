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
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["LEFT"] = 3] = "LEFT";
})(Direction || (Direction = {}));
function createKey(vector) {
    return "".concat(vector.point.x, ",").concat(vector.point.y, ",").concat(vector.direction);
}
function dfs(board, point, target, direction, score) {
    if (score > 99460) {
        return;
    }
    if (board[point.y][point.x] === "#") {
        return;
    }
    var vector = { point: point, direction: direction };
    var key = createKey(vector);
    if (scores.has(key) && scores.get(key) <= score) {
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
function part2() {
    var best = part1(board, start, end);
    scores.forEach(function (score, key) {
        if (score === best) {
            queue.push(key);
        }
    });
    while (queue.length > 0) {
        var top_1 = queue[0];
        queue.shift();
        var score = scores.get(top_1);
        var _a = top_1.split(",").map(function (x) { return Number(x); }), x = _a[0], y = _a[1], dir = _a[2];
        found.push([x, y]);
        var left = (dir + 3) % 4;
        var right = (dir + 1) % 4;
        var forward;
        switch (dir) {
            case Direction.UP:
                forward = "".concat(x, ",").concat(y + 1);
                break;
            case Direction.DOWN:
                forward = "".concat(x, ",").concat(y - 1);
                break;
            case Direction.LEFT:
                forward = "".concat(x + 1, ",").concat(y);
                break;
            case Direction.RIGHT:
                forward = "".concat(x - 1, ",").concat(y);
                break;
        }
        var leftKey = "".concat(x, ",").concat(y, ",").concat(left);
        var rightKey = "".concat(x, ",").concat(y, ",").concat(right);
        var forwardKey = "".concat(forward, ",").concat(dir);
        if (scores.has(leftKey) && scores.get(leftKey) === score - 1000) {
            queue.push(leftKey);
        }
        if (scores.has(rightKey) && scores.get(rightKey) === score - 1000) {
            queue.push(rightKey);
        }
        if (scores.has(forwardKey) && scores.get(forwardKey) === score - 1) {
            queue.push(forwardKey);
        }
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
                board[i][m] = "O";
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
board.forEach(function (line) {
    console.log(line.join(""));
});
