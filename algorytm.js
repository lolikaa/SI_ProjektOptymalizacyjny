const faker = require('faker');
const fs = require('fs');
const parse = require('csv-parse');

const algorytm = () => { 

let HM =[];
let FP=[]; //[total weight, total usefulness]
const HMS=15;
const maxWeight = 10000; //10 kg w gramach

let parser = parse({columns: true}, function (err, results){
    //       console.log(results);
 
    for(i=0; i<HMS; i++) {
        let arrHM = [];
        let itemWeigth=0;
        let totalWeight =0;
        let totalUsefulness=0;
  
            for(j=0; totalWeight<maxWeight; j++){
    
                let random = faker.datatype.number({
                    'min': 0,
                    'max': results.length-1});
                // console.log( "element j = " + j + " to id tablicy rezultatów : " + random);

                itemWeigth = parseInt(results[random]['WEIGHT [g]']);
                let itemUsefulness = parseInt(results[random]['USEFULNESS [1-100]']);

                totalWeight = totalWeight + itemWeigth;
                if(totalWeight<maxWeight){
                    arrHM.push(random);
                    totalUsefulness= totalUsefulness + itemUsefulness;
                } 
            }

        totalWeight=totalWeight-itemWeigth;
        // console.log('total weight: ' + totalWeight);
            let arrFP=[];
            arrFP.push(totalUsefulness);

        FP.push(arrFP);
        HM.push(arrHM);
        console.log("ostatni wynik: " + HM[i]);
        console.log("funkcja przystosowania [suma przydatności]: " + FP[i]);
    }
});

fs.createReadStream(__dirname+'/data.csv').pipe(parser);

}
module.exports = algorytm;