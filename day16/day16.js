var fs = require("fs");
var total = 0;
var failedPaths = [];
var visitedLocations = new Map();
var correctTotals = [];
var Directions;
(function (Directions) {
    Directions[Directions["UP"] = 0] = "UP";
    Directions[Directions["DOWN"] = 1] = "DOWN";
    Directions[Directions["LEFT"] = 2] = "LEFT";
    Directions[Directions["RIGHT"] = 3] = "RIGHT";
    Directions[Directions["BLOCK"] = 4] = "BLOCK";
})(Directions || (Directions = {}));
function checkArray(x, y, direction) {
    var key = "".concat(x, ",").concat(y);
    if (visitedLocations.has(key)) {
        return false;
    }
    return true;
}
function createEntry(total, direction, directions, x, y) {
    var newFailed = {
        total: total,
        direction: direction,
        directions: directions,
        location: [x, y],
    };
    return newFailed;
}
function checkDirections(direction, board, deerX, deerY) {
    var direct = [];
    switch (direction) {
        case Directions.UP:
            if (board[deerY][deerX - 1] != "#" &&
                checkArray(deerX - 1, deerY, direction)) {
                direct.push(Directions.LEFT);
            }
            if (board[deerY][deerX + 1] != "#" &&
                checkArray(deerX + 1, deerY, direction)) {
                direct.push(Directions.RIGHT);
            }
            if (board[deerY - 1][deerX] != "#" &&
                checkArray(deerX, deerY - 1, direction)) {
                direct.push(Directions.UP);
            }
            break;
        case Directions.LEFT:
            if (board[deerY + 1][deerX] != "#" &&
                checkArray(deerX, deerY + 1, direction)) {
                direct.push(Directions.DOWN);
            }
            if (board[deerY - 1][deerX] != "#" &&
                checkArray(deerX, deerY - 1, direction)) {
                direct.push(Directions.UP);
            }
            if (board[deerY][deerX - 1] != "#" &&
                checkArray(deerX - 1, deerY, direction)) {
                direct.push(Directions.LEFT);
            }
            break;
        case Directions.RIGHT:
            if (board[deerY - 1][deerX] != "#" &&
                checkArray(deerX, deerY - 1, direction)) {
                direct.push(Directions.UP);
            }
            if (board[deerY + 1][deerX] != "#" &&
                checkArray(deerX, deerY + 1, direction)) {
                direct.push(Directions.DOWN);
            }
            if (board[deerY][deerX + 1] != "#" &&
                checkArray(deerX + 1, deerY, direction)) {
                direct.push(Directions.RIGHT);
            }
            break;
        case Directions.DOWN:
            if (board[deerY][deerX + 1] != "#" &&
                checkArray(deerX + 1, deerY, direction)) {
                direct.push(Directions.RIGHT);
            }
            if (board[deerY][deerX - 1] != "#" &&
                checkArray(deerX - 1, deerY, direction)) {
                direct.push(Directions.LEFT);
            }
            if (board[deerY + 1][deerX] != "#" &&
                checkArray(deerX, deerY + 1, direction)) {
                direct.push(Directions.DOWN);
            }
            break;
    }
    if (direct.length > 1) {
        failedPaths.push(createEntry(total, direction, direct, deerX, deerY));
        visitedLocations.set("".concat(deerX, ",").concat(deerY), direction);
        return direct[0];
    }
    else if (direct.length == 1) {
        return direct[0];
    }
    return Directions.BLOCK;
}
function part1(board) {
    var deerX = 1;
    var deerY = board.length - 2;
    var direction = Directions.RIGHT;
    while (true) {
        console.log(deerX, deerY);
        var check = checkDirections(direction, board, deerX, deerY);
        total += check == direction ? 1 : 1000;
        var filteredFails = failedPaths.filter(function (x) { return x.directions.length > 0; });
        if (check == Directions.BLOCK) {
            try {
                var index = filteredFails.length - 1;
                deerX = filteredFails[index].location[0];
                deerY = filteredFails[index].location[1];
                direction = filteredFails[index].directions[0];
                check = direction;
                filteredFails[index].directions.shift();
                total = filteredFails[index].total;
                console.log("resetting total: ", total);
            }
            catch (e) {
                break;
            }
        }
        else {
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
var board = [];
lines.forEach(function (line) {
    board.push(line.split(""));
});
part1(board);
console.log(correctTotals);
for (var _i = 0, correctTotals_1 = correctTotals; _i < correctTotals_1.length; _i++) {
    var element = correctTotals_1[_i];
    if (element < total) {
        total = element;
    }
}
console.log(total);
