var fs = require("fs");

let total = 0;

function mix(given: number, secret: number) {
  return (given ^ secret) >>> 0;
}

function prune(secret: number) {
  return secret % 16777216;
}

function createSecret(secret: number, iteration: number) {
  let stepOne: number = prune(mix(secret * 64, secret));
  let stepTwo: number = prune(mix(Math.floor(stepOne / 32), stepOne));
  let stepThree: number = prune(mix(stepTwo * 2048, stepTwo));

  if (iteration < 1999) {
    return createSecret(stepThree, iteration + 1);
  } else {
    return stepThree;
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
  total += createSecret(Number(line), 0);
});

console.log(total);
