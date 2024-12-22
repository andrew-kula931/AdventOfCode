var fs = require("fs");

let total = 0;

function mix(given: number, secret: number) {
  return given ^ secret;
}

function prune(secret: number) {
  return secret % 16777216;
}

function createSecret(secret: number) {
  let stepOne = prune(mix(secret * 64, secret));
  let stepTwo = prune(mix(Math.round(stepOne / 32), stepOne));
  let stepThree = prune(mix(stepTwo * 2024, stepTwo));

  return stepThree;
}

var filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

lines.forEach(function (line) {
  console.log(createSecret(Number(line)));
});
