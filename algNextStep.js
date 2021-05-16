const algorytm = require('./algorytm.js');
const faker = require('faker');
const fs = require('fs');
const parse = require('csv-parse');
const { FORMERR } = require('dns');

const algNextStep = () => {

    const maxIteracji = 1000;
    const HMCR = 70; //prawdopodobieństwo wystąpienia w %
   

    fs.createReadStream(__dirname + '/data.csv')
        .pipe(parse({ columns: true }, function (err, results) {

            for (i = 0; i < maxIteracji; i++) {
                let tmpHM = []; // random items => sum <= maxWeight
                let tmpFP = []; //[total usefulness]
                let totalWeight = 0;
                let totalUsefulness =0;
                let iRandom;

                //generowanie losowej liczby r1 od 1 do 100
                let r1 = faker.datatype.number({
                    'min': 1,
                    'max': 100
                });


                if (r1 < HMCR) {
                    //szukam nowego rozwiązania z pamięci algorytmu HM
                    for (j = 0; j < HM.length; j++) {
                        do {
                                iRandom = faker.datatype.number({
                                'min': 0,
                                'max': HM.length-1
                            });
                        } while ((HM[j][iRandom] === undefined));

                        let iWeight = parseFloat(results[iRandom]['WEIGHT [g]']);
                        let iUsefulness = parseInt(results[iRandom]['USEFULNESS [1-100]']);

                        // checking the weight of items
                        totalWeight = totalWeight + iWeight; //totalWeight = totalWeight + random itemWeigth from column [i]; 
                        if (totalWeight <= maxWeight) {
                            tmpHM.push(iRandom);
                            totalUsefulness = totalUsefulness + iUsefulness;
                        }
                    }
                    tmpFP.push(totalUsefulness);
                }
                else {
                    // szukam rozwiązania w całej bazie tak samo jak w 1 części algorytmu
                    for (j=0; totalWeight < maxWeight; j++) {
        
                            iRandom = faker.datatype.number({
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
                    tmpFP.push(totalUsefulness);
                }

                // po każdej iteracji porównujemy nowe rozwiązanie z istniejącymi
                for (k=0; k<FP.length; k++) {
                    if(tmpFP[0] > FP[k]) {
                        FP[k] = tmpFP;
                        HM[k] = tmpHM;
                        break;
                    };
                }
                
            }

            console.log('After second step of algoritm we have: ');
            for(m=0; m < HM.length; m++) {
                console.log(`HM[${m}]:  ${HM[m]}`);
                console.log(`FP[${m}]:  ${FP[m]}`);
            }
        }));
}

module.exports = algNextStep;