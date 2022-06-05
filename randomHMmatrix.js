const fs = require('fs');
const parse = require('csv-parse');
const minmax = require('./minmax.js');
const randomNumber = require('./getRandomNumber.js');
const optimalizationHM = require('./optimalizationHMmatrix.js');

const randomHMmatrix = async () => {

await fs.createReadStream(__dirname+'/data.csv')
.pipe(parse({columns: true}, function (err, results) {
          
        for (i=0; i < HMS; i++) {
            let tmpHM = [];
            let totalWeight = 0;
            let totalUsefulness = 0;


                // losujemy rzeczy - nie mogą przekroczyć max wagi
                while (totalWeight < maxWeight) {
                    let iRandom = randomNumber(0,results.length-1);
                    let iWeight = parseFloat(results[iRandom]['WEIGHT [g]'],2);
                    let iUsefulness = parseInt(results[iRandom]['USEFULNESS [1-100]']);

                    if ((totalWeight+iWeight) < maxWeight) {
                        totalWeight = totalWeight + iWeight;
                        totalUsefulness = totalUsefulness + iUsefulness;
                        tmpHM.push(iRandom);
                    } else {
                        break;
                    }
                } 

            HM.push(tmpHM);  // zapisuję rozwiązanie w pamięci algorytmu
            FP.push(totalUsefulness);
            itemsWeight.push(totalWeight.toFixed(2));
            
            console.log(`HM[${i}]:  ${HM[i]}`);
            console.log(`FP[${i}]:  ${FP[i]}`);
            console.log(`Weight: ${itemsWeight[i]}`);
            console.log('----');
        }
    }))
    .on('end', () => {
        minmax();
    });
   optimalizationHM();
}


module.exports = randomHMmatrix;