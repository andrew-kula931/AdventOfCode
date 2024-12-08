const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let line0 = "";
let line1 = "";
let line2 = "";
let total = 0;

rl.on('line', function(input) {
  if (input.toLowerCase() == 'done') {
    console.log(total);
    rl.close();
  }
  
  if (line1 == "") {
    line1 = input;
    return;
  }  

  line2 = input;

  for (let i = 0; i < line1.length; i++) {
    if (line1[i] == "A") {
      try {
        if (line0[i - 1] == "M" && line0[i + 1] == "S" && line2[i - 1] == "M" && line2[i + 1] == "S") {
          total++;
        }
      } catch (e) {}
      try {
        if (line0[i - 1] == "S" && line0[i + 1] == "S" && line2[i - 1] == "M" && line2[i + 1] == "M") {
          total++;
        }
      } catch (e) {}
      try {
        if (line0[i - 1] == "S" && line0[i + 1] == "M" && line2[i - 1] == "S" && line2[i + 1] == "M") {
          total++;
        }
      } catch (e) {}
      try {
        if (line0[i - 1] == "M" && line0[i + 1] == "M" && line2[i - 1] == "S" && line2[i + 1] == "S") {
          total++;
        }
      } catch (e) {}
    }
  }

  //Shifting all variables
  line0 = line1;
  line1 = line2;

});