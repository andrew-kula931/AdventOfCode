var fs = require("fs");
var total = 0;
function move(fishX, fishY, direction) {
    var tempX = fishX;
    var tempY = fishY;
    var moved = false;
    var returnSpots = [];
    var fishPos = { x: fishX, y: fishY };
    var changing = {
        key1: "[",
        key2: "]",
        locations1: [],
        locations2: [],
    };
    var changedSpots = {
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
                    if (!changedSpots.locations2.some(function (arr) {
                        return arr.every(function (value, index) { return value === [tempX + 1, tempY][index]; });
                    })) {
                        returnSpots.push([tempX + 1, tempY + 1]);
                    }
                    changing.locations1.push([tempX, tempY - 1]);
                    board[tempY][tempX] = ".";
                    changedSpots.locations1.push([tempX, tempY]);
                    moved = true;
                    continue;
                }
                else if (board[tempY - 1][tempX] == "]") {
                    tempY--;
                    if (!changedSpots.locations1.some(function (arr) {
                        return arr.every(function (value, index) { return value === [tempX - 1, tempY][index]; });
                    })) {
                        returnSpots.push([tempX - 1, tempY + 1]);
                    }
                    changing.locations2.push([tempX, tempY - 1]);
                    board[tempY][tempX] = ".";
                    changedSpots.locations2.push([tempX, tempY]);
                    moved = true;
                    continue;
                }
                else if (board[tempY - 1][tempX] == "#") {
                    for (var _i = 0, _a = changedSpots.locations1; _i < _a.length; _i++) {
                        var spot = _a[_i];
                        board[spot[1]][spot[0]] = changedSpots.key1;
                    }
                    for (var _b = 0, _c = changedSpots.locations2; _b < _c.length; _b++) {
                        var spot = _c[_b];
                        board[spot[1]][spot[0]] = changedSpots.key2;
                    }
                    return fishPos;
                }
                else {
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
            for (var _d = 0, _e = changing.locations1; _d < _e.length; _d++) {
                var item = _e[_d];
                board[item[1]][item[0]] = changing.key1;
            }
            for (var _f = 0, _g = changing.locations2; _f < _g.length; _f++) {
                var item = _g[_f];
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
                }
                else if (board[fishY][tempX - 1] == "#") {
                    return fishPos;
                }
                else {
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
                    if (!changedSpots.locations2.some(function (arr) {
                        return arr.every(function (value, index) { return value === [tempX + 1, tempY][index]; });
                    })) {
                        returnSpots.push([tempX + 1, tempY - 1]);
                    }
                    changing.locations1.push([tempX, tempY + 1]);
                    board[tempY][tempX] = ".";
                    changedSpots.locations1.push([tempX, tempY]);
                    moved = true;
                    continue;
                }
                else if (board[tempY + 1][tempX] == "]") {
                    tempY++;
                    if (!changedSpots.locations1.some(function (arr) {
                        return arr.every(function (value, index) { return value === [tempX - 1, tempY][index]; });
                    })) {
                        returnSpots.push([tempX - 1, tempY - 1]);
                    }
                    changing.locations2.push([tempX, tempY + 1]);
                    board[tempY][tempX] = ".";
                    changedSpots.locations2.push([tempX, tempY]);
                    moved = true;
                    continue;
                }
                else if (board[tempY + 1][tempX] == "#") {
                    for (var _h = 0, _j = changedSpots.locations1; _h < _j.length; _h++) {
                        var spot = _j[_h];
                        board[spot[1]][spot[0]] = changedSpots.key1;
                    }
                    for (var _k = 0, _l = changedSpots.locations2; _k < _l.length; _k++) {
                        var spot = _l[_k];
                        board[spot[1]][spot[0]] = changedSpots.key2;
                    }
                    return fishPos;
                }
                else {
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
            for (var _m = 0, _o = changing.locations1; _m < _o.length; _m++) {
                var item = _o[_m];
                board[item[1]][item[0]] = changing.key1;
            }
            for (var _p = 0, _q = changing.locations2; _p < _q.length; _p++) {
                var item = _q[_p];
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
                }
                else if (board[fishY][tempX + 1] == "#") {
                    return fishPos;
                }
                else {
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
    var fish = {
        x: 0,
        y: 0,
    };
    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
            if (board[y][x] === "@") {
                fish.x = x;
                fish.y = y;
            }
        }
    }
    for (var m = 0; m < movement.length; m++) {
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
    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
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
var board = [];
var movement = "";
lines.forEach(function (line) {
    var newLine = "";
    for (var l = 0; l < line.length; l++) {
        if (line[l] == "#") {
            newLine = newLine + "##";
        }
        else if (line[l] == ".") {
            newLine = newLine + "..";
        }
        else if (line[l] == "O") {
            newLine = newLine + "[]";
        }
        else {
            newLine = newLine + "@.";
        }
    }
    var splitLine = newLine.split("");
    if (splitLine[0] === "#") {
        board.push(splitLine);
    }
    else {
        movement = movement + line;
    }
});
part1(board, movement);
console.log(total);
