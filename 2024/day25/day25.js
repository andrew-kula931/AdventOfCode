var fs = require("fs");
var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);
var locks = [];
var keys = [];
var count = 0;
var locking = [];
lines.forEach(function (line) {
    if (count < 6) {
        locking.push(line.split(""));
        count++;
    }
    else {
        locking.push(line.split(""));
        var values = [];
        for (var x = 0; x < locking[0].length; x++) {
            var internalCount = 0;
            for (var y = 0; y < locking.length; y++) {
                if (locking[y][x] === "#")
                    internalCount++;
            }
            values.push(internalCount);
        }
        if (locking[0][0] == "#") {
            locks.push(values);
        }
        else {
            keys.push(values);
        }
        count = 0;
        locking = [];
    }
});
var combinations = 0;
for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    for (var _a = 0, locks_1 = locks; _a < locks_1.length; _a++) {
        var lock = locks_1[_a];
        for (var i = 0; i < 5; i++) {
            if (key[i] + lock[i] > 7) {
                break;
            }
            if (i === 4) {
                combinations++;
            }
        }
    }
}
console.log(combinations);
