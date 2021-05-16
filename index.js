const fs = require('fs');
const dataGenerator = require('./dataGenerator.js');
const algorytm = require('./algorytm.js');
const path = "data.csv";

global.HM =[];              // pamięć algorytmu
global.FP =[];               // fitness
global.HMS =15;              // ile próbek wylosować
global.maxWeight = 10000;   //10 kg w gramach

if(!fs.existsSync(path)) dataGenerator(); // jesli nie ma pliku csv generuj dane
    
// jesli dane.csv są gotowe -> przejdź do algorytmu
algorytm();