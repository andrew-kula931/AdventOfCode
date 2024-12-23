var fs = require("fs");
function sortConnections() {
    var trios = [];
    dependencies.forEach(function (value, key) {
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var one = value_1[_i];
            if (dependencies.has(one)) {
                for (var _a = 0, _b = dependencies.get(one); _a < _b.length; _a++) {
                    var two = _b[_a];
                    if (dependencies.has(two)) {
                        if (dependencies.get(two).includes(key)) {
                            trios.push([key, one, two]);
                        }
                    }
                }
            }
        }
    });
    var tTrios = [];
    for (var _i = 0, trios_1 = trios; _i < trios_1.length; _i++) {
        var trio = trios_1[_i];
        if (trio[0].startsWith("t") ||
            trio[1].startsWith("t") ||
            trio[2].startsWith("t")) {
            tTrios.push(trio);
        }
    }
    console.log(tTrios.length / 6);
}
function findPassword() {
    var finalList = [];
    dependencies.forEach(function (value, key) {
        if (value.length >= finalList.length) {
            for (var _i = 0, value_2 = value; _i < value_2.length; _i++) {
                var num = value_2[_i];
                var connectedList = [];
                var checking = dependencies.get(num);
                for (var i = 0; i < dependencies.get(num).length; i++) {
                    if (!value.includes(checking[i])) {
                        continue;
                    }
                    connectedList.push(checking[i]);
                }
                if (connectedList.length > finalList.length) {
                    finalList = connectedList;
                }
            }
        }
    });
    console.log(finalList);
}
var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);
var dependencies = new Map();
lines.forEach(function (line) {
    var _a, _b;
    var connections = line.split("-");
    if (dependencies.has(connections[0])) {
        var lst = (_a = dependencies.get(connections[0])) !== null && _a !== void 0 ? _a : [];
        lst.push(connections[1]);
        dependencies.set(connections[0], lst);
    }
    else {
        dependencies.set(connections[0], [connections[1]]);
    }
    if (dependencies.has(connections[1])) {
        var lst = (_b = dependencies.get(connections[1])) !== null && _b !== void 0 ? _b : [];
        lst.push(connections[0]);
        dependencies.set(connections[1], lst);
    }
    else {
        dependencies.set(connections[1], [connections[0]]);
    }
});
//sortConnections();
findPassword();
