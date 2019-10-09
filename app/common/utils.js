let utils = {

    batchBySize: (arr, size) => {
        let batches = [];
        let copy = arr.slice(0);
        while (copy.length) {
            batches.push(copy.splice(0, size));
        }
        return batches;
    },

    batchByCount: (arr, count) => {
        return utils.batchBySize(arr, Math.ceil(arr.length / count));
    },
    
    range: max => {
        return [...Array(max)].map((_, i) => i + 1);
    }

};

if (typeof exports !== 'undefined') {
    exports = module.exports = utils;
}