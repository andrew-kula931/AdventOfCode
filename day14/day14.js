var fs = require("fs");
var quad1 = 0;
var quad2 = 0;
var quad3 = 0;
var quad4 = 0;
function part1(bot) {
    for (var i = 0; i < 100; i++) {
        bot.x += bot.vx;
        bot.y += bot.vy;
        if (bot.x >= 101) {
            bot.x -= 101;
        }
        else if (bot.x < 0) {
            bot.x += 101;
        }
        if (bot.y >= 103) {
            bot.y -= 103;
        }
        else if (bot.y < 0) {
            bot.y += 103;
        }
    }
    if (bot.x < 50 && bot.y < 51) {
        quad1++;
    }
    else if (bot.x > 50 && bot.y < 51) {
        quad2++;
    }
    else if (bot.x < 50 && bot.y > 51) {
        quad3++;
    }
    else if (bot.x > 50 && bot.y > 51) {
        quad4++;
    }
}
function stdeviation() { }
function part2(bots) {
    for (var i = 0; i < 7672; i++) {
        bots = bots.map(function (bot) {
            bot.x += bot.vx;
            bot.y += bot.vy;
            if (bot.x >= 101) {
                bot.x -= 101;
            }
            else if (bot.x < 0) {
                bot.x += 101;
            }
            if (bot.y >= 103) {
                bot.y -= 103;
            }
            else if (bot.y < 0) {
                bot.y += 103;
            }
            return bot;
        });
    }
}
function printBoard(bots) {
    bots.map(function (bot) {
        board[bot.y] =
            board[bot.y].substring(0, bot.x) +
                "1" +
                board[bot.y].substring(bot.x + 1);
    });
    console.log(board);
}
function newBot(x, y, vx, vy) {
    var bot = {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
    };
    return bot;
}
var board = [];
for (var i = 0; i < 103; i++) {
    board.push("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
}
var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);
var bots = [];
lines.forEach(function (line) {
    var pandV = line.split(" ");
    var p = pandV[0].split(",");
    var v = pandV[1].split(",");
    var bot = newBot(Number(p[0].substring(2)), Number(p[1]), Number(v[0].substring(2)), Number(v[1]));
    bots.push(bot);
});
part2(bots);
printBoard(bots);
