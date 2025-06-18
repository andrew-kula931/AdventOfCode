var fs = require("fs");
function splitString(numbers, center) {
    var first = numbers.substring(0, center);
    var second = numbers.substring(center);
    second = Number(second).toString();
    return [first, second];
}
function blink(oldLine) {
    var newLine = [];
    oldLine.forEach(function (x) {
        if (Number(x) === 0) {
            newLine.push("1");
        }
        else if (x.length % 2 == 0) {
            var splitNum = splitString(x, x.length / 2);
            newLine.push(splitNum[0]);
            newLine.push(splitNum[1]);
        }
        else {
            newLine.push((Number(x) * 2024).toString());
        }
    });
    return newLine;
}
function checkDictionary(dict, key, value) {
    if (dict.has(key)) {
        var newTotal = Number(dict.get(key)) + value;
        dict.set(key, newTotal);
    }
    else {
        dict.set(key, value);
    }
    return dict;
}
function blinkSmart(dict) {
    //Object.entries(dict).forEach(([key, value]) => {});
    var finalDict = Array.from(dict.entries()).reduce(function (newDict, _a) {
        var key = _a[0], value = _a[1];
        if (Number(key) === 0) {
            key = "1";
            newDict = checkDictionary(newDict, key, value);
        }
        else if (key.length % 2 == 0) {
            var splitNum = splitString(key, key.length / 2);
            newDict = checkDictionary(newDict, splitNum[0], value);
            newDict = checkDictionary(newDict, splitNum[1], value);
        }
        else {
            newDict = checkDictionary(newDict, (Number(key) * 2024).toString(), value);
        }
        return newDict;
    }, new Map());
    return finalDict;
}
function part1(line) {
    var currentLine = line.split(" ");
    //const currentLine: Array<Number> = stringLine.map((x) => Number(x));
    for (var i = 0; i < 25; i++) {
        currentLine = blink(currentLine);
    }
    return currentLine.length;
}
function part2(line) {
    var dict = new Map([]);
    var currentLine = line.split(" ");
    currentLine.forEach(function (x) { return dict.set(x, 1); });
    for (var i = 0; i < 75; i++) {
        dict = blinkSmart(dict);
    }
    return Array.from(dict.entries()).reduce(function (acc, _a) {
        var key = _a[0], value = _a[1];
        return acc + value;
    }, 0);
}
var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);
lines.forEach(function (line) {
    console.log(part2(line));
});
