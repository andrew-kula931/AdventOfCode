var fs = require("fs");

let originA: number = 0;
let a: number = 0;
let b: number = 1;
let c: number = 1;
let operationLine: string[] = [];
let output: string = "";
let pointer: number = 0;

function findCombo(literal: number): number {
  switch (literal) {
    case 0:
    case 1:
    case 2:
    case 3:
      return literal;
    case 4:
      return a;
    case 5:
      return b;
    case 6:
      return c;
    default:
      console.log("Critical error when finding Combo");
      return 0;
  }
}

function run(opticode: number, operand: number) {
  switch (opticode) {
    case 0:
      adv(findCombo(operand));
      break;
    case 1:
      bxl(operand);
      break;
    case 2:
      bst(findCombo(operand));
      break;
    case 3:
      jnz(operand);
      break;
    case 4:
      bxc();
      break;
    case 5:
      out(findCombo(operand));
      break;
    case 6:
      bdv(findCombo(operand));
      break;
    case 7:
      cdv(findCombo(operand));
      break;
    default:
      console.log("Catastrophic error when running Combo");
      break;
  }
}

//Id 0
function adv(power: number) {
  a = Math.trunc(a / Math.pow(2, power));
}

//Id 1
function bxl(literal: number) {
  let bitwise = (b ^ literal) >>> 0;
  b = bitwise;
}

//Id 2
function bst(combo: number) {
  b = combo % 8;
}

//Id 3
function jnz(literal: number) {
  if (a == 0) {
    return;
  }
  pointer = literal;
}

//Id 4
function bxc() {
  let bitwise = (b ^ c) >>> 0;
  b = bitwise;
}

//Id 5
function out(combo: number) {
  let returnList: string = (combo % 8).toString();
  if (output.length != 0) {
    returnList = "," + returnList;
  }
  output += returnList;
}

//Id 6
function bdv(power: number) {
  b = Math.trunc(a / Math.pow(2, power));
}

//Id 7
function cdv(power: number) {
  c = Math.trunc(a / Math.pow(2, power));
}

function part1() {
  while (pointer < operationLine.length) {
    let checkPointer = pointer;
    run(Number(operationLine[pointer]), Number(operationLine[pointer + 1]));
    if (pointer == checkPointer) {
      pointer += 2;
    }
  }
}

function part2() {
  while (pointer < operationLine.length) {
    let checkPointer = pointer;
    run(Number(operationLine[pointer]), Number(operationLine[pointer + 1]));
    if (pointer == checkPointer) {
      pointer += 2;
    }
  }
  return output.split(",");
}

var filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

lines.forEach(function (line) {
  const newValue = line.split(": ");
  if (newValue.length === 2) {
    if (a == 0) {
      a = newValue[1];
      originA = Number(newValue[1]);
    } else if (b != 0) {
      b = newValue[1];
    } else if (c != 0) {
      c = newValue[1];
    } else {
      operationLine = newValue[1].split(",");
    }
  }
});
//part1();
originA = 0;
a = 0;
let sameOutput: string[] = [];
outerLoop: while (true) {
  sameOutput = part2();

  for (let i = 0; i < operationLine.length; i++) {
    if (sameOutput[i] !== operationLine[i]) {
      break;
    }
    if (i == operationLine.length - 1 && sameOutput[i] === operationLine[i]) {
      break outerLoop;
    }
  }

  for (let i = operationLine.length - 1; i >= 0; i--) {
    if (sameOutput[i] != operationLine[i]) {
      originA += Math.pow(8, i);
      a = originA;
      pointer = 0;
      c = 0;
      b = 0;
      output = "";
      break;
    }
  }
}

console.log(originA);
