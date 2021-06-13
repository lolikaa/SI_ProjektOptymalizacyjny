const fs = require('fs');
const dataGenerator = require('./dataGenerator.js');
const algorytm = require('./algorytm.js');
const algNextStep = require('./algNextStep.js');
const path = "data.csv";

HM =[];                // pamięć algorytmu
FP =[];                // fitness
itemsWeight =[];       // waga wszystkich rzeczy
HMS =15;               // ile próbek wylosować
maxWeight = 10000;     //10 kg w gramach


if (!fs.existsSync(path)) {  
  dataGenerator(gotData);
} else {
   algorytmStart();
}

function algorytmStart() {
   algorytm();
   algNextStep();
}


  




