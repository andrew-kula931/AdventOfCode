var fs = require("fs");
var total = 0;
var keyPad = new Map([
    ["7", [0, 0]],
    ["8", [1, 0]],
    ["9", [2, 0]],
    ["4", [0, 1]],
    ["5", [1, 1]],
    ["6", [2, 1]],
    ["1", [0, 2]],
    ["2", [1, 2]],
    ["3", [2, 2]],
    ["0", [1, 3]],
    ["A", [2, 3]],
]);
var dirPad = new Map([
    ["^", [1, 0]],
    ["A", [2, 0]],
    ["<", [0, 1]],
    ["v", [1, 1]],
    [">", [2, 1]],
]);
function keyOperation(code) {
    var codeList = code.split("");
    var x = 2;
    var y = 3;
    var movements = "";
    for (var _i = 0, codeList_1 = codeList; _i < codeList_1.length; _i++) {
        var num = codeList_1[_i];
        //Find the distances
        var coord = keyPad.get(num);
        var changeX = coord[0] - x;
        var changeY = coord[1] - y;
        //Add the corresponding characters to the list
        //Negative X = < | Negative Y = ^
        if (changeY + y != 0) {
            for (var y_1 = 0; y_1 < Math.abs(changeY); y_1++) {
                movements += changeY > 0 ? "v" : "^";
            }
            for (var x_1 = 0; x_1 < Math.abs(changeX); x_1++) {
                movements += changeX > 0 ? ">" : "<";
            }
        }
        else {
            for (var x_2 = 0; x_2 < Math.abs(changeX); x_2++) {
                movements += changeX > 0 ? ">" : "<";
            }
            for (var y_2 = 0; y_2 < Math.abs(changeY); y_2++) {
                movements += changeY > 0 ? "v" : "^";
            }
        }
        //Add an A
        movements += "A";
        //Reset the position
        x = coord[0];
        y = coord[1];
    }
    return movements;
}
function dirOperation(code) {
    var codeList = code.split("");
    var x = 2;
    var y = 0;
    var movements = "";
    for (var _i = 0, codeList_2 = codeList; _i < codeList_2.length; _i++) {
        var move = codeList_2[_i];
        //Find the distances
        var coord = dirPad.get(move);
        var changeX = coord[0] - x;
        var changeY = coord[1] - y;
        //Add the corresponding characters to the list
        //Negative X = < | Negative Y = ^
        if (changeY + y != 0) {
            for (var y_3 = 0; y_3 < Math.abs(changeY); y_3++) {
                movements += changeY > 0 ? "v" : "^";
            }
            for (var x_3 = 0; x_3 < Math.abs(changeX); x_3++) {
                movements += changeX > 0 ? ">" : "<";
            }
        }
        else {
            for (var x_4 = 0; x_4 < Math.abs(changeX); x_4++) {
                movements += changeX > 0 ? ">" : "<";
            }
            for (var y_4 = 0; y_4 < Math.abs(changeY); y_4++) {
                movements += changeY > 0 ? "v" : "^";
            }
        }
        //Add an A
        movements += "A";
        //Reset the position
        x = coord[0];
        y = coord[1];
    }
    return movements;
}
function part1(code) {
    var codeList = code.split("");
    var numList = codeList;
    numList.pop();
    var codesNum = numList.join("");
    var key = keyOperation(code);
    console.log(key);
    var move1 = dirOperation(key);
    console.log(move1);
    var move2 = dirOperation(move1);
    console.log(move2);
    console.log(codesNum, move2.length);
    total += Number(codesNum) * move2.length;
}
function part2(code) {
    var codeList = code.split("");
    var numList = codeList;
    numList.pop();
    var codesNum = numList.join("");
    var key = keyOperation(code);
    var zero = 0;
    var move;
    for (var i = 0; i < 25; i++) {
        if (zero === 0) {
            console.log("Running even");
            move = dirOperation(key);
            zero = 1;
        }
        else {
            console.log("Running odd");
            key = dirOperation(move);
            zero = 0;
        }
    }
    console.log(codesNum, move.length);
    total += Number(codesNum) * move.length;
}
var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);
lines.forEach(function (line) {
    part2(line);
});
console.log(total);
