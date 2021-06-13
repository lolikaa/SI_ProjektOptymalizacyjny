const fs = require('fs');
const parse = require('csv-parse');
const minmax = require('./minmax.js');
const randomNumber = require('./getRandomNumber.js');


const algNextStep = () => {

    const maxIteracji = 10000;
    const HMCR = 70; //prawdopodobieństwo wystąpienia w %
    const PAR = 15;
    let iterArr=[]; let fp0Arr=[]; let fp1Arr=[]; let fp2Arr=[]; let fp3Arr =[]; let fp4Arr=[];


    fs.createReadStream(__dirname + '/data.csv')
        .pipe(parse({ columns: true }, function (err, results) {

            for (let i = 0; i < maxIteracji; i++) {
                let tmpHM = []; 
                let tmpFP = []; 
                let tmpW = [];
                let totalWeight = 0;
                let totalUsefulness = 0;
                let iWeight = 0;
                let iUsefulness = 0;
                let iRandom;
                
                // <----------------------------------------- HMCR --------------------------------------------> //   
                let r1 = randomNumber(0,100);
                if (r1 < HMCR) { //szukam nowego rozwiązania z pamięci algorytmu HM

                    for (j = 1; j < HM.length; j++) { // sprawdzam ilość kolumn
                        var longest = HM[0].length;
                        if (HM[j].length > longest) {longest = HM[j].length;}
                    }

                    for (m=0; j < longest-1; j++) {
                        let lista = [];                   
                        for(k=0; k < HM.length; k++) {
                            if( HM[k][m] !== undefined) lista.push(HM[k][m]);
                        }    

                            iRandom = randomNumber(0, lista.length-1);
                            let item = lista[iRandom];

                            iWeight = parseFloat(results[item]['WEIGHT [g]'],2);
                            iUsefulness = parseInt(results[item]['USEFULNESS [1-100]']);

                            if ((totalWeight+iWeight) < maxWeight) {
                                totalWeight = totalWeight + iWeight;
                                totalUsefulness = totalUsefulness + iUsefulness;
                                tmpHM.push(item);
                            } else {
                                break;
                            }
                    }
                    tmpFP.push(totalUsefulness);
                    tmpW.push(totalWeight.toFixed(2));


                    // <----------------------------------------- PAR --------------------------------------------> //                   
                    let r2 = randomNumber(0,100);
                    if (r2 < PAR) {

                        let randomSwap = randomNumber(0,tmpHM.length-1); // losuje element do wyrzucenia
                        //usuwam jego wagę
                        iWeight = parseFloat(results[randomSwap]['WEIGHT [g]']);
                        totalWeight = totalWeight - iWeight;
                        // usuwam jego przydatność
                        iUsefulness = parseInt(results[randomSwap]['USEFULNESS [1-100]']);
                        totalUsefulness = totalUsefulness - iUsefulness;

                        do {         // losuję nowy element z bazy i sprawdzam czy się wagowo zmieści                   
                            iRandom = randomNumber(0,results.length-1);
                            iWeight = parseFloat(results[iRandom]['WEIGHT [g]']);
                        } while (totalWeight + iWeight > maxWeight);
         
                            tmpHM[randomSwap] = iRandom; // podmiana
                            // dodaję przydatność nowego elementu do zsumowanej
                            iUsefulness = parseInt(results[iRandom]['USEFULNESS [1-100]']);
                            totalUsefulness = totalUsefulness + iUsefulness;
                            totalWeight = totalWeight + iWeight;
                            tmpFP = totalUsefulness;   
                            tmpW = totalWeight.toFixed(2); 
                    }

                     
                } // <----------------------------------------- LOSOWA --------------------------------------------> //  
                else { // szukam rozwiązania w całej bazie tak samo jak w 1 części algorytmu
                    while(totalWeight < maxWeight) {

                        // losowanie nowego elementu z bazy i odczytanie jego wagi i przydatności
                        iRandom = randomNumber(0,results.length-1);
                        iWeight = parseFloat(results[iRandom]['WEIGHT [g]'],2);
                        iUsefulness = parseInt(results[iRandom]['USEFULNESS [1-100]']);

                        // sprawdzenie czy mieści się wagowo
                        if ((totalWeight+iWeight) < maxWeight) {
                            totalWeight = totalWeight + iWeight;
                            totalUsefulness = totalUsefulness + iUsefulness;
                            tmpHM.push(iRandom);
                        } else {
                            break;
                        }
                    }
                    tmpFP.push(totalUsefulness);
                    tmpW.push(totalWeight.toFixed(2));
                }

                // tablice wartosci do pliku json
                if ( i%250===0 ) {
                    iterArr.push(i);
                    fp0Arr.push(FP[0]);
                    fp1Arr.push(FP[1]);
                    fp2Arr.push(FP[2]);
                    fp3Arr.push(FP[3]);
                    fp4Arr.push(FP[4]);
                 }

                // porównujemy czy nowe rozwiązanie jest lepsze niż najgorsze
                let worst = Math.min.apply(Math, FP)
                if(tmpFP[0] > worst) {
                    let worstIndex = FP.indexOf(worst);
                    FP[worstIndex] = tmpFP[0];
                    HM[worstIndex] = tmpHM;
                    itemsWeight[worstIndex] = tmpW[0];
                }
            } // -------- koniec głównej pętli -------------------------------------

            console.log('After second step of algoritm we have: ');
            for (p = 0; p < HM.length; p++) {
                console.log(`HM[${p}]:  ${HM[p]}`);
                console.log(`FP[${p}]:  ${FP[p]}`);
                console.log(`Weight: ${itemsWeight[p]}`);
                console.log('----');
            }

            // zapis do pliku
            let data = {
                'iteracja': iterArr,
                'fp0': fp0Arr,
                'fp1': fp1Arr,
                'fp2': fp2Arr,
                'fp3': fp3Arr,
                'fp4': fp4Arr
            }
            fs.writeFileSync('static/FPdata.json', JSON.stringify(data, null, 2));
        }))
        .on('end', () => {
            minmax();
        });  
}



module.exports = algNextStep;