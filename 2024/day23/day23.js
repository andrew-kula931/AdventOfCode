var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
    var nodes = Array.from(dependencies.keys());
    //Helper function to check if a subset form a clique
    function isClique(subset) {
        for (var i = 0; i < subset.length; i++) {
            for (var j = i + 1; j < subset.length; j++) {
                if (!dependencies.get(subset[i]).includes(subset[j])) {
                    return false;
                }
            }
        }
        return true;
    }
    function findClique(nodes) {
        var adjList = new Map();
        // Build adjacency list from dependencies
        nodes.forEach(function (node) {
            adjList.set(node, new Set(dependencies.get(node) || []));
        });
        function bronKerbosch(R, P, X) {
            if (P.size === 0 && X.size === 0) {
                if (R.size > finalList.length) {
                    finalList = Array.from(R);
                }
                return;
            }
            var pivot = P.size ? P.values().next().value : X.values().next().value;
            var pivotNeighbors = adjList.get(pivot) || new Set();
            var _loop_1 = function (v) {
                if (!pivotNeighbors.has(v)) {
                    var neighbors_1 = adjList.get(v) || new Set();
                    bronKerbosch(new Set(R).add(v), new Set(__spreadArray([], P, true).filter(function (x) { return neighbors_1.has(x); })), new Set(__spreadArray([], X, true).filter(function (x) { return neighbors_1.has(x); })));
                    P.delete(v);
                    X.add(v);
                }
            };
            for (var _i = 0, P_1 = P; _i < P_1.length; _i++) {
                var v = P_1[_i];
                _loop_1(v);
            }
        }
        bronKerbosch(new Set(), new Set(nodes), new Set());
    }
    findClique(nodes);
    var sortedList = finalList.sort();
    console.log(sortedList.join(","));
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
