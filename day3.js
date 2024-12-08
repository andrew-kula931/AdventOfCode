const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let total = 0;
let index = 0;
let doIndex = 0;
let dontIndex = 0;
const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let firstNum = null;
let secondNum = null;
let comma = false;
let doMultiply = true;

rl.on('line', function(input) {
  if (input.toLowerCase() == 'done') {
    rl.close();
  }

  while (true) {

    doIndex = input.indexOf('do()');
    dontIndex = input.indexOf('don\'t()');
    index = input.indexOf('mul');

    if (index == -1) {
      if (doIndex > dontIndex) {
        doMultiply = true;
      } else if (dontIndex > doIndex) {
        doMultiply = false;
      }
      break;
    }

    if (doIndex != -1 && doIndex < index && (doIndex < dontIndex || dontIndex == -1)) {
      doMultiply = true;
    }

    if (dontIndex != -1 && dontIndex < index && (dontIndex < doIndex || doIndex == -1)) {
      doMultiply = false;
    }

    firstNum = 0;
    secondNum = 0;
    comma = false;

    if (doMultiply) {
      outerLoop: for (let i = 3; i < 12; i++) {
        switch (i) {
          case 3:
            if (input[index + i] != '(') {
              input = input.substring(index + 1);
              break outerLoop;
            }
            break;
          case 4:
            if (nums.includes(input[index + i])) {
              firstNum += input[index + i];
              break;
            } else {
              input = input.substring(index + 1);
              break outerLoop;
            }
          case 5:
            if (nums.includes(input[index + i])) {
              firstNum += input[index + i];
              break;
            } else if (input[index + i] == ',') {
              comma = true;
              break;
            } else {
              input = input.substring(index + 1);
              break outerLoop;
            }
          case 6:
            if (nums.includes(input[index + i]) && comma == false) {
              firstNum += input[index + i];
              break;
            } else if (input[index + i] == ',' && comma == false) {
              comma = true;
              break;
            } else if (comma == true && nums.includes(input[index + i])) {
              secondNum += input[index + i];
              break;
            } else {
              input = input.substring(index + 1);
              break outerLoop;
            }
          case 7:
            if (input[index + i] == ',' && comma == false) {
              comma = true;
              break;
            } else if (comma == false) {
              input = input.substring(index + 1);
              break outerLoop;
            } else if (nums.includes(input[index + i])) {
              secondNum += input[index + i];
              break;
            } else if (input[index + i] == ')' && firstNum != null && secondNum != null && comma == true) {
              total += (Number(firstNum) * Number(secondNum));
              input = input.substring(index + 1);
              break outerLoop;
            } else {
              input = input.substring(index + 1);
              break outerLoop;
            }
          case 8:
            if (nums.includes(input[index + i])) {
              secondNum += input[index + i];
              break;
            } else if (input[index + i] == ')' && firstNum != null && secondNum != null && comma == true) {
              total += (Number(firstNum) * Number(secondNum));
              input = input.substring(index + 1);
              break outerLoop;
            } else {
              input = input.substring(index + 1);
              break outerLoop;
            }
          case 9:
            if (input[index + i] == ')' && firstNum != null && secondNum != null && comma == true) {
              total += (Number(firstNum) * Number(secondNum));
              input = input.substring(index + 1);
              break outerLoop;
            } else if (secondNum.length < 4 && nums.includes(input[index + i])) {
              secondNum += input[index + i];
              break;
            } else {
              input = input.substring(index + 1);
              break outerLoop;
            }
          case 10:
            if (input[index + i] == ')' && firstNum != null && secondNum != null && comma == true) {
              total += (Number(firstNum) * Number(secondNum));
              input = input.substring(index + 1);
              break outerLoop;
            } else if (secondNum.length < 4 && nums.includes(input[index + i])) {
              secondNum += input[index + i];
              break;
            } else {
              input = input.substring(index + 1);
              break outerLoop;
            }
          case 11:
            if (input[index + i] == ')' && firstNum != null && secondNum != null && comma == true) {
              total += (Number(firstNum) * Number(secondNum));
              input = input.substring(index + 1);
              break outerLoop;
            } else {
              input = input.substring(index + 1);
              break outerLoop;
            }
          default:
            break;
        }
      }
    }
    if (!doMultiply) {
      input = input.substring(index + 1);
    }

  }

  console.log(total);

});