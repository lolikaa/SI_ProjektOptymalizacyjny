module.exports = function(start, range) {
        let getRandom;
        do {
            getRandom = Math.floor((Math.random() * range) + start);
            } while(getRandom > range);
        return getRandom;
}




