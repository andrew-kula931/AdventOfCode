var fs = require("fs");

function splitString(numbers: String, center: number) {
  const first = numbers.substring(0, center);
  let second = numbers.substring(center);

  second = Number(second).toString();

  return [first, second];
}

function blink(oldLine: Array<String>) {
  const newLine: string[] = [];
  oldLine.forEach((x) => {
    if (Number(x) === 0) {
      newLine.push("1");
    } else if (x.length % 2 == 0) {
      const splitNum = splitString(x, x.length / 2);
      newLine.push(splitNum[0]);
      newLine.push(splitNum[1]);
    } else {
      newLine.push((Number(x) * 2024).toString());
    }
  });

  return newLine;
}

function checkDictionary(
  dict: Map<String, Number>,
  key: String,
  value: number
) {
  if (dict.has(key)) {
    let newTotal = Number(dict.get(key)) + value;
    dict.set(key, newTotal);
  } else {
    dict.set(key, value);
  }
  return dict;
}

function blinkSmart(dict: Map<any, any>) {
  //Object.entries(dict).forEach(([key, value]) => {});
  const finalDict = Array.from(dict.entries()).reduce(
    (newDict: Map<any, any>, [key, value]) => {
      if (Number(key) === 0) {
        key = "1";
        newDict = checkDictionary(newDict, key, value);
      } else if (key.length % 2 == 0) {
        const splitNum = splitString(key, key.length / 2);
        newDict = checkDictionary(newDict, splitNum[0], value);
        newDict = checkDictionary(newDict, splitNum[1], value);
      } else {
        newDict = checkDictionary(
          newDict,
          (Number(key) * 2024).toString(),
          value
        );
      }
      return newDict;
    },
    new Map<any, any>()
  );

  return finalDict;
}

function part1(line) {
  let currentLine: Array<String> = line.split(" ");
  //const currentLine: Array<Number> = stringLine.map((x) => Number(x));

  for (let i = 0; i < 25; i++) {
    currentLine = blink(currentLine);
  }

  return currentLine.length;
}

function part2(line) {
  let dict = new Map<String, number>([]);
  let currentLine: Array<String> = line.split(" ");
  currentLine.forEach((x) => dict.set(x, 1));

  for (let i = 0; i < 75; i++) {
    dict = blinkSmart(dict);
  }

  return Array.from(dict.entries()).reduce((acc, [key, value]) => {
    return acc + value;
  }, 0);
}

var filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

lines.forEach(function (line) {
  console.log(part2(line));
});
