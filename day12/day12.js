var fs = require("fs");
var total = 0;
var cache = [];
function newRegion(char) {
    var region = {
        char: char,
        locations: [],
        perimeter: 0,
        north: [],
        west: [],
        south: [],
        east: [],
    };
    return region;
}
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}
function findSides(region) {
    for (var i = 0; i < region.north.length - 1; i++) {
        if (region.north[i][1] != region.north[i + 1][1]) {
            region.perimeter++;
        }
    }
    region.perimeter++;
    for (var i = 0; i < region.west.length - 1; i++) {
        if (region.west[i][0] != region.west[i + 1][0]) {
            region.perimeter++;
        }
    }
    region.perimeter++;
    for (var i = 0; i < region.south.length - 1; i++) {
        if (region.south[i][1] != region.south[i + 1][1]) {
            region.perimeter++;
        }
    }
    region.perimeter++;
    for (var i = 0; i < region.east.length - 1; i++) {
        if (region.east[i][0] != region.east[i + 1][0]) {
            region.perimeter++;
        }
    }
    region.perimeter++;
    console.log(region.perimeter);
    console.log("North: " + region.north);
    console.log("West: " + region.west);
    console.log("South: " + region.south);
    console.log("East: " + region.east);
    return region.perimeter;
}
function checkDirections(locX, locY, grid, directionNum, region, regionNum) {
    var y = locY;
    var x = locX;
    switch (directionNum) {
        case 1:
            if (y == 0) {
                //region.perimeter++;
                region.north.push([x, --y]);
                return checkDirections(locX, locY, grid, directionNum + 1, region, regionNum);
            }
            y--;
            break;
        case 2:
            if (x == 0) {
                //region.perimeter++;
                region.west.push([--x, y]);
                return checkDirections(locX, locY, grid, directionNum + 1, region, regionNum);
            }
            x--;
            break;
        case 3:
            if (y == grid.length - 1) {
                //region.perimeter++;
                region.south.push([x, ++y]);
                return checkDirections(locX, locY, grid, directionNum + 1, region, regionNum);
            }
            y++;
            break;
        case 4:
            if (x == grid[y].length - 1) {
                //region.perimeter++;
                region.east.push([++x, y]);
                return checkDirections(locX, locY, grid, directionNum + 1, region, regionNum);
            }
            x++;
            break;
        case 5:
            if (regionNum + 1 >= region.locations.length) {
                total += findSides(region) * region.locations.length;
                return;
            }
            regionNum++;
            return checkDirections(region.locations[regionNum][0], region.locations[regionNum][1], grid, 1, region, regionNum);
        default:
            throw new Error("Undefined direction");
    }
    if (grid[y][x] === region.char) {
        if (!region.locations.some(function (loc) { return arraysEqual(loc, [x, y]); })) {
            region.locations.push([x, y]);
            if (!cache.some(function (loc) { return arraysEqual(loc, [x, y]); })) {
                cache.push([x, y]);
            }
        }
        return checkDirections(locX, locY, grid, directionNum + 1, region, regionNum);
    }
    else {
        //region.perimeter++;
        if (y < locY) {
            region.north.push([x, y]);
        }
        else if (y > locY) {
            region.south.push([x, y]);
        }
        else if (x < locX) {
            region.west.push([x, y]);
        }
        else if (x > locX) {
            region.east.push([x, y]);
        }
        return checkDirections(locX, locY, grid, directionNum + 1, region, regionNum);
    }
}
//Use when necessary
//const [newX, newY] = checkDirections(0, 0, grid, "N");
//if (!newX || !newY) {
//continue;
//}
function part1(board) {
    var _loop_1 = function (y) {
        var _loop_2 = function (x) {
            if (cache.some(function (loc) { return arraysEqual(loc, [x, y]); })) {
                return "continue";
            }
            var region = newRegion(board[y][x]);
            region.locations.push([x, y]);
            checkDirections(x, y, board, 1, region, 0);
        };
        for (var x = 0; x < board[y].length; x++) {
            _loop_2(x);
        }
    };
    for (var y = 0; y < board.length; y++) {
        _loop_1(y);
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
lines.forEach(function (line) {
    board.push(line.split(""));
});
part1(board);
console.log(total);
