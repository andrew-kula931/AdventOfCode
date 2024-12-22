var fs = require("fs");
var total = 0;
function mix(given, secret) {
    return given ^ secret;
}
function prune(secret) {
    return secret % 16777216;
}
function createSecret(secret) {
    var stepOne = prune(mix(secret * 64, secret));
    var stepTwo = prune(mix(Math.round(stepOne / 32), stepOne));
    var stepThree = prune(mix(stepTwo * 2024, stepTwo));
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
