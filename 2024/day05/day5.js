const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let rules = new Map([]);
let num1 = 0;
let num2 = 0;
let mapArray = [];
let total = 0;

rl.on('line', function(input) {
  if (input.toLowerCase() == 'done') {
    console.log(total);
    rl.close();
  }

  //Guard clause
  if (input.length == 0) {
    return;
  }

  mapArray = [];

  if (input.length == 5) {
    num1 = input.substring(0, 2);
    num2 = input.substring(3, 5);

    if (rules.has(num1)) {
      mapArray = rules.get(num1);
      mapArray.push(num2);
      rules.set(num1, mapArray);

    } else {
      mapArray.push(num2);
      rules.set(num1, mapArray);
    }
  } else {
    let newInput = input.split(",");

    for (let i = 0; i < newInput.length; i++) {

      if (rules.has(newInput[i])) {
        mapArray = rules.get(newInput[i]);

        for (let l = 0; l < i; l++) {
          
          if (mapArray.includes(newInput[l])) {
            return;
          }
        }
      }
    }
    total += Number(newInput[Math.floor(newInput.length / 2)]);
  }
});