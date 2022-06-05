const fs = require('fs');
const dataGenerator = require('./dataGenerator.js');
const randomHMmatrix = require('./randomHMmatrix.js');
const path = "data.csv";

HM =[];                // pamięć algorytmu
FP =[];                // fitness
itemsWeight =[];       // waga wszystkich rzeczy
HMS =15;               // ile próbek wylosować
maxWeight = 10000;     //10 kg w gramach


if (!fs.existsSync(path)) {  
   
   async function generateAndGo() {
      await dataGenerator();
   }
   generateAndGo();

} else {
   randomHMmatrix();
}




  




