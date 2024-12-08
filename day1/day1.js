const readline = require('readline'); 
const rl = readline.createInterface({ 
  input: process.stdin, 
  output: process.stdout }); 
  
let lst1 = []; 
let lst2 = []; 

rl.on('line', function(input) { 
  if (input.toLowerCase() === 'done') { 
    lst1.sort((a,b) => a - b);
    lst2.sort((a,b) => a - b);

    console.log(lst1);
    console.log(lst2);

    total = 0;
    for (let i = 0; i < lst1.length; i++) {
      let filteredNumbers = lst2.filter(num => num === lst1[i]);
      total += (lst1[i] * filteredNumbers.length);
    }

    console.log(total);
    rl.close(); 
  } else { 
    let nums = input.split("   ");
    lst2.push(nums[1]);
    lst1.push(nums[0]); } 
  });

