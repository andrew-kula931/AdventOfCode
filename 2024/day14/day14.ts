var fs = require("fs");

let quad1 = 0;
let quad2 = 0;
let quad3 = 0;
let quad4 = 0;

function part1(bot: Bot) {
  for (let i = 0; i < 100; i++) {
    bot.x += bot.vx;
    bot.y += bot.vy;

    if (bot.x >= 101) {
      bot.x -= 101;
    } else if (bot.x < 0) {
      bot.x += 101;
    }

    if (bot.y >= 103) {
      bot.y -= 103;
    } else if (bot.y < 0) {
      bot.y += 103;
    }
  }

  if (bot.x < 50 && bot.y < 51) {
    quad1++;
  } else if (bot.x > 50 && bot.y < 51) {
    quad2++;
  } else if (bot.x < 50 && bot.y > 51) {
    quad3++;
  } else if (bot.x > 50 && bot.y > 51) {
    quad4++;
  }
}

function stdeviation() {}

function part2(bots: Bot[]) {
  for (let i = 0; i < 7672; i++) {
    bots = bots.map((bot) => {
      bot.x += bot.vx;
      bot.y += bot.vy;

      if (bot.x >= 101) {
        bot.x -= 101;
      } else if (bot.x < 0) {
        bot.x += 101;
      }

      if (bot.y >= 103) {
        bot.y -= 103;
      } else if (bot.y < 0) {
        bot.y += 103;
      }
      return bot;
    });
  }
}

function printBoard(bots: Bot[]) {
  bots.map((bot) => {
    board[bot.y] =
      board[bot.y].substring(0, bot.x) +
      "1" +
      board[bot.y].substring(bot.x + 1);
  });
  console.log(board);
}

interface Bot {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function newBot(x: number, y: number, vx: number, vy: number) {
  const bot: Bot = {
    x: x,
    y: y,
    vx: vx,
    vy: vy,
  };
  return bot;
}

const board: string[] = [];
for (let i = 0; i < 103; i++) {
  board.push(
    "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  );
}

var filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

let bots: Bot[] = [];

lines.forEach(function (line) {
  const pandV = line.split(" ");
  const p = pandV[0].split(",");
  const v = pandV[1].split(",");

  let bot: Bot = newBot(
    Number(p[0].substring(2)),
    Number(p[1]),
    Number(v[0].substring(2)),
    Number(v[1])
  );

  bots.push(bot);
});

part2(bots);
printBoard(bots);
