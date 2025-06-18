const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lineN2 = "";
let lineN1 = "";
let line0 = "";
let line1 = "";
let line2 = "";
let line3 = "";
let line4 = "";
let total = 0;

rl.on('line', function(input) {
  if (input.toLowerCase() == 'done') {
    console.log(total);
    rl.close();
  }
  
  if (line1 == "") {
    line1 = input;
    return;
  } else if (line2 == "") {
    line2 = input;
    return;
  } else if (line3 == "") {
    line3 = input;
    return;
  } 

  line4 = input;

  for (let i = 0; i < line1.length; i++) {
    if (line1[i] == "X") {
      try {
        if (line1[i - 1] == "M") {
          if (line1[i - 2] == "A") {
            if (line1[i - 3] == "S") {
              total++;
            }
          }
        }
      } catch (e) {}
      try {
        if (line2[i - 1] == "M") {
          if (line3[i - 2] == "A") {
            if (line4[i - 3] == "S") {
              total++;
            }
          }
        }
      } catch (e) {}
      try {
        if (line2[i] == "M") {
          if (line3[i] == "A") {
            if (line4[i] == "S") {
              total++;
            }
          }
        }
      } catch (e) {}
      try {
        if (line2[i + 1] == "M") {
          if (line3[i + 2] == "A") {
            if (line4[i + 3] == "S") {
              total++;
            }
          }
        }
      } catch (e) {}
      try {
        if (line1[i + 1] == "M") {
          if (line1[i + 2] == "A") {
            if (line1[i + 3] == "S") {
              total++;
            }
          }
        }
      } catch (e) {}
      try {
        if (line0[i + 1] == "M") {
          if (lineN1[i + 2] == "A") {
            if (lineN2[i + 3] == "S") {
              total++;
            }
          }
        }
      } catch (e) {}
      try {
        if (line0[i] == "M") {
          if (lineN1[i] == "A") {
            if (lineN2[i] == "S") {
              total++;
            }
          }
        }
      } catch (e) {}
      try {
        if (line0[i - 1] == "M") {
          if (lineN1[i - 2] == "A") {
            if (lineN2[i - 3] == "S") {
              total++;
            }
          }
        }
      } catch (e) {}
    }
  }

  //Shifting all variables
  lineN2 = lineN1;
  lineN1 = line0;
  line0 = line1;
  line1 = line2;
  line2 = line3;
  line3 = line4;

});