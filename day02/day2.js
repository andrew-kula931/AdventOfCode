const readline = require('readline'); 
const rl = readline.createInterface({ 
  input: process.stdin, 
  output: process.stdout }); 

let count = 0;
let growing = null;
let last = null;
let dampenedIndex = null;
let beforeCount = null;

rl.on('line', function(input) { 
  
  if (input.toLowerCase() == 'done') {
    console.log(count);
    rl.close();
  }

  runCheck(input);
  if (dampenedIndex != null) {
    beforeCount = count;
    amount = input.split(" ");
    for (let i = 0; i < amount.length; i++) {
      if (beforeCount == count) {
        runDampenedCheck(input, i);
      }
    }
  }

});

function runCheck(input) {
  growing = null;
  last = null;
  dampenedIndex = null;

  output = input.split(' ');

  for (let i = 0; i < output.length; i++) {
    if (i == 0) {
      last = output[i];
      continue;
    }

    if (parseInt(output[i]) == parseInt(last)) {
      dampenedIndex = i;
      break;
    }

    if (parseInt(output[i]) > parseInt(last)) {
      if (growing == false || parseInt(output[i]) > (parseInt(last) + 3)) {
        dampenedIndex = i;
        break;
      } 
      last = output[i];
      growing = true;
    } else {
      if (growing == true || parseInt(output[i]) < (parseInt(last) - 3)) {
        dampenedIndex = i;
        break;
      }
      last = output[i];
      growing = false;
    }

    if (i == output.length - 1) {
      count++;
    }
  }
}

function runDampenedCheck(input, dampenedIndex) {

  output = input.split(' ');
  output.splice(dampenedIndex, 1);

  growing = null;
  last = null;

  for (let i = 0; i < output.length; i++) {
    if (i == 0) {
      last = output[i];
      continue;
    }

    if (parseInt(output[i]) == parseInt(last)) {
      break;
    }

    if (parseInt(output[i]) > parseInt(last)) {
      if (growing == false || parseInt(output[i]) > (parseInt(last) + 3)) {
        break;
      } 
      last = output[i];
      growing = true;
    } else {
      if (growing == true || parseInt(output[i]) < (parseInt(last) - 3)) {
        break;
      }
      last = output[i];
      growing = false;
    }

    if (i == output.length - 1) {
      count++;
    }
  }
}