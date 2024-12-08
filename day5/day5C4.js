"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function reorderPages(rules, update) {
    var dependents = {};
    var dependencies = {};
    var inUpdate = new Set(update);
    rules.forEach(function (_a) {
        var pageA = _a[0], pageB = _a[1];
        if (!inUpdate.has(pageA) || !inUpdate.has(pageB))
            return;
        if (!dependents[pageA])
            dependents[pageA] = [];
        dependents[pageA].push(pageB);
        dependencies[pageB] = (dependencies[pageB] || 0) + 1;
    });
    var ordered = [];
    var queue = [];
    update.forEach(function (num) {
        if (!dependencies[num])
            queue.push(num);
    });
    while (queue.length > 0) {
        var page = queue.shift();
        ordered.push(page);
        (dependents[page] || []).forEach(function (dependent) {
            dependencies[dependent]--;
            if (dependencies[dependent] === 0)
                queue.push(dependent);
        });
    }
    var pageSeen = new Set(ordered);
    update.forEach(function (page) {
        if (!pageSeen.has(page))
            ordered.push(page);
    });
    return ordered;
}
function part1(rules, updates) {
    var middleSum = 0;
    updates.forEach(function (update) {
        var pageIndex = {};
        update.forEach(function (num, i) {
            pageIndex[num] = i;
        });
        var failed = false;
        rules.forEach(function (_a) {
            var pageA = _a[0], pageB = _a[1];
            if (pageIndex[pageA] !== undefined &&
                pageIndex[pageB] !== undefined &&
                pageIndex[pageA] > pageIndex[pageB]) {
                failed = true;
            }
        });
        if (!failed) {
            middleSum += update[Math.floor(update.length / 2)];
        }
    });
    return middleSum;
}
function part2(rules, updates) {
    var middleSum = 0;
    updates.forEach(function (update) {
        var pageIndex = {};
        update.forEach(function (num, i) {
            pageIndex[num] = i;
        });
        var failed = false;
        rules.forEach(function (_a) {
            var pageA = _a[0], pageB = _a[1];
            if (pageIndex[pageA] !== undefined &&
                pageIndex[pageB] !== undefined &&
                pageIndex[pageA] > pageIndex[pageB]) {
                failed = true;
            }
        });
        if (failed) {
            var fixedUpdate = reorderPages(rules, update);
            middleSum += fixedUpdate[Math.floor(fixedUpdate.length / 2)];
        }
    });
    return middleSum;
}
var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\n").filter(Boolean);
var rules = [];
var updates = [];
lines.forEach(function (line) {
    if (line.includes("|")) {
        var _a = line.split("|").map(Number), a = _a[0], b = _a[1];
        rules.push([a, b]);
    }
    else {
        var update = line.split(",").map(Number);
        updates.push(update);
    }
});
console.log(part1(rules, updates));
console.log(part2(rules, updates));
