var fs = require("fs");

let idString = [];
let idStringList = [];
let id = 0;
let checksum = 0;

function part1(line) {

  for (let i = 0; i < line.length; i++) {
    if (i % 2 == 0) {
      for (let t = 0; t < Number(line[i]); t++) {
        idString.push(id);
      }
      
      id++;

    } else {
      for (let t = 0; t < Number(line[i]); t++) {
        idString.push(".");
      }
    }

  }

  idStringList = idString;

  for (let i = 0; i < idString.length; i++) {
    if (idStringList[i] === ".") {
      while (idStringList[idStringList.length - 1] === ".") {
        idStringList.pop();
      }
      if (idStringList.length > i) {
        idStringList[i] = idStringList.pop();
      } else { 
        idStringList[i] = ""; 
      }
    }
  }

  //idStringList = idStringList.filter(item => item !== '.' && item !== '');

  id = 0;
  for (let i = 0; i < idStringList.length; i++) {
    if (isNaN(idStringList[i])) {
      console.log(i);
      console.log(idStringList[i]);
      break;
    }
    checksum += Number(idStringList[i]) * id;
    id++;
  }
}

function part2(line) {

  for (let i = 0; i < line.length; i++) {
    if (i % 2 == 0) {
      for (let t = 0; t < Number(line[i]); t++) {
        idString.push(id);
      }
      
      id++;

    } else {
      for (let t = 0; t < Number(line[i]); t++) {
        idString.push(".");
      }
    }

  }

  idStringList = idString;
  //Algorithm to move file blocks
  let index = idStringList.length - 1;
  while (index >= 0) {
    if (idStringList[index] === ".") {
      index--;
      continue;
    }

    let indexes = [];
    let char = idStringList[index];
    let charSize = 0;
    let searchIndex = index;
    while (idStringList[searchIndex] === char) {
      if (searchIndex < 0) {
        break;
      }
      indexes.push(searchIndex);
      charSize++;
      searchIndex--;
    }

    let dotSize = 0;
    for (let i = 0; i < idStringList.length; i++) {
      if (idStringList[i] == ".") {
        dotSize++;
      } else {
        dotSize = 0;
      }

      if (i > index) {
        break;
      }

      if (dotSize == charSize) {
        i -= (charSize - 1);
        for (let l = 0; l < charSize; l++) {
          idStringList[i] = char;
          idStringList[indexes[l]] = ".";
          i++;
        }
        break;
      }
    }

    index -= charSize;
  } 

  id = 0;
  for (let m = 0; m < idStringList.length; m++) {
    if (idStringList[m] == ".") {
      id++;
      continue;
    }
    checksum += idStringList[m] * id;
    id++;
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
   part2(line);
});

console.log(checksum);
