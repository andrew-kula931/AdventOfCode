var fs = require("fs");
var total = 0;
var found = new Map();
function checkLine1(line, i) {
    if (line.length === 0) {
        total++;
        return true;
    }
    if (i > line.length) {
        return false;
    }
    var checking = line.substring(0, i);
    if (options.includes(checking)) {
        if (checkLine1(line.substring(i), 1)) {
            return true;
        }
    }
    return checkLine1(line, i + 1);
}
function checkLine2(line) {
    if (found.has(line)) {
        return found.get(line);
    }
    if (line.length === 0) {
        return 1;
    }
    var subCount = 0;
    for (var i = 1; i <= line.length; i++) {
        var substring = line.substring(0, i);
        if (options.includes(substring)) {
            subCount += checkLine2(line.substring(i));
        }
    }
    found.set(line, subCount);
    return subCount;
}
var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\n").filter(Boolean);
var lineNum = 0;
var options;
lines.forEach(function (line) {
    console.log(line);
    if (lineNum === 0) {
        options = line.split(", ");
    }
    else {
        total += checkLine2(line);
    }
    lineNum++;
});
console.log(total);
