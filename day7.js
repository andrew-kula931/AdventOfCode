var fs = require("fs");

let total = 0;

function part1(line) {
    //Prepares the line
    let newLine = line.split(" ");
    newLine[0] = newLine[0].substring(0, newLine[0].length - 1);

    let collectedNums = [];
    let secondCollectedNums = [];

    for (let l = 1; l < newLine.length; l++) {
        if (l == 1) {
            collectedNums.push(Number(newLine[1]));
            continue;
        }

        if (secondCollectedNums.length > 0) {
            let size = secondCollectedNums.length;

            for (let m = 0; m < size; m++) {
                collectedNums.push(secondCollectedNums[m] + Number(newLine[l]));
                collectedNums.push(secondCollectedNums[m] * Number(newLine[l]));
                collectedNums.push(Number(String(secondCollectedNums[m]) + newLine[l]));
            }

            secondCollectedNums = [];
            
        } else {
            let size = collectedNums.length;

            for (let m = 0; m < size; m++) {
                secondCollectedNums.push(collectedNums[m] + Number(newLine[l]));
                secondCollectedNums.push(collectedNums[m] * Number(newLine[l]));
                secondCollectedNums.push(Number(String(collectedNums[m]) + newLine[l]));
            }

            collectedNums = [];
        }
    }

    if (collectedNums.includes(Number(newLine[0]))) {
        total += Number(newLine[0]);
    } else if (secondCollectedNums.includes(Number(newLine[0]))) {
        total += Number(newLine[0]);
    }
}

var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

lines.forEach(function (line) {
    part1(line);
   
});

console.log(total);