var fs = require("fs");
var values = new Map([]);
function and(objOne, objTwo) {
    if (values.get(objOne) == 1 && values.get(objTwo) == 1) {
        return 1;
    }
    return 0;
}
function or(objOne, objTwo) {
    if (values.get(objOne) == 1 || values.get(objTwo) == 1) {
        return 1;
    }
    return 0;
}
function xor(objOne, objTwo) {
    if ((values.get(objOne) == 0 && values.get(objTwo) == 1) ||
        (values.get(objOne) == 1 && values.get(objTwo) == 0)) {
        return 1;
    }
    return 0;
}
function part1() {
    var _a;
    var i = 0;
    while (awaiting.length > 0) {
        if (i >= awaiting.length) {
            i = 0;
            continue;
        }
        var check = awaiting[i].split(" ");
        if (values.has(check[0]) && values.has(check[2])) {
            switch (check[1]) {
                case "AND":
                    values.set(check[4], and(check[0], check[2]));
                    break;
                case "OR":
                    values.set(check[4], or(check[0], check[2]));
                    break;
                case "XOR":
                    values.set(check[4], xor(check[0], check[2]));
                    break;
                default:
                    console.log("Error running the switch case");
                    break;
            }
            awaiting.splice(i, 1);
        }
        i++;
    }
    var collection = [];
    values.forEach(function (value, key) {
        if (key.startsWith("z")) {
            collection.push(key);
        }
    });
    var binary = "";
    collection.sort();
    for (var key = collection.length - 1; key >= 0; key--) {
        binary += (_a = values.get(collection[key])) === null || _a === void 0 ? void 0 : _a.toString();
    }
    console.log(binary);
    console.log(parseInt(binary, 2));
}
function debugging() {
    var x = "";
    var y = "";
    values.forEach(function (value, key) {
        if (key.startsWith("x")) {
            x += value;
        }
        else if (key.startsWith("y")) {
            y += value;
        }
    });
    console.log(x, y);
    x = x.split("").reverse().join("");
    y = y.split("").reverse().join("");
    console.log(parseInt(x, 2));
    console.log(parseInt(y, 2));
}
var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);
var awaiting = [];
lines.forEach(function (line) {
    if (line.includes(":")) {
        var splitLine = line.split(": ");
        values.set(splitLine[0], Number(splitLine[1]));
    }
    else {
        awaiting.push(line);
    }
});
part1();
//debugging();
/*

Current z value: 42410633905894
Correct z value: 42402077001446

Current z binary: 1001101001001001111110110001001100011011100110
Correct z binary: 1001101001000010000000101111001100011011100110

z's needing to change:
z19, z20, z21, z22, z25, z26, z27, z28, z29, z30, z31, z33

fts OR pkm -> csn (Should be 1)

--csn AND nmn -> z19 (Should use XOR)
--svm XOR dhf -> z20
fsf XOR wnk -> z21  = 0 <- now
pjm XOR ktd -> z22
--vbw OR qkk -> z25  = 1 <- now
--jnb XOR mps -> z26
bbt XOR bcr -> z27 (Swap with other z XOR)
svs XOR vsj -> z28
tjh XOR dch -> z29
sjg XOR grr -> z30
qhv XOR twk -> z31
hgj XOR cqm -> z33


Current Switches: cqm, mps, vjv, vwp, z19, z25
*/
