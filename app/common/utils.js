let utils = {

    batch: (arr, size) => {
        let batches = [];
        let copy = arr.slice(0);
        while (copy.length) {
            batches.push(copy.splice(0, size));
        }
        return batches;
    },
    
    range: max => {
        return [...Array(max)].map((_, i) => i + 1);
    }

};

if (typeof exports !== 'undefined') {
    exports = module.exports = utils;
}