module.exports = function () { 

        let minFP= Math.min.apply(Math, FP);
        let maxFP= Math.max.apply(Math, FP);
        let maxIndex= FP.indexOf(maxFP);
        let minIndex= FP.indexOf(minFP);
        let minHM=HM[minIndex];
        let maxHM=HM[maxIndex];
        let minWeight = itemsWeight[minIndex];
        let maxWeight = itemsWeight[maxIndex];

        console.log("##############################################################################################################################################################################")
        console.log();
        console.log(`The worst FP ${minFP}`);
        console.log();
        console.log(`The worst HM[${minIndex}]: `);
        console.log(`with ${HM[minIndex].length} items:  ${minHM}`);
        console.log(`Weight of items ${minWeight}`);
        console.log("---------------------------------------------------------------------------------------------------")
        console.log(`The best FP: ${maxFP}`);
        console.log();
        console.log(`The best HM[${maxIndex}]`);
        console.log(`with ${HM[maxIndex].length} items:  ${maxHM}`);
        console.log(`Weight of items ${maxWeight}`);
        console.log();
        console.log("##############################################################################################################################################################################")

}
