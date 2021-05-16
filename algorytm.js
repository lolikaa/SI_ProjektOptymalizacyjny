const faker = require('faker');
const fs = require('fs');
const parse = require('csv-parse');
const algNextStep = require('./algNextStep');

const algorytm = () => { 

fs.createReadStream(__dirname+'/data.csv')
.pipe(parse({columns: true}, function (err, results) {
          // console.log(results);
        for (i=0; i < HMS; i++) {
            let tmpHM = [];
            let totalWeight =0;
            let totalUsefulness=0;
    
                for (j=0; totalWeight < maxWeight; j++) {
        
                    let iRandom = faker.datatype.number({
                        'min': 0,
                        'max': results.length-1});

                    let iWeight = parseFloat(results[iRandom]['WEIGHT [g]']);
                    let iUsefulness = parseInt(results[iRandom]['USEFULNESS [1-100]']);

                    // checking the weight of items
                    totalWeight = totalWeight + iWeight;
                    if (totalWeight <= maxWeight) {
                        tmpHM.push(iRandom);
                        totalUsefulness = totalUsefulness + iUsefulness;
                    } 
                }

            HM.push(tmpHM);
            FP.push(totalUsefulness);
            
            console.log(`HM[${i}]:  ${HM[i]}`);
            console.log(`FP[${i}]:  ${FP[i]}`);
        }
        console.log("-------------------------------------------------------------------------------");
        algNextStep();
    }));
}

module.exports = algorytm;