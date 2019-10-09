function compute(data, options, log) {
    return new Promise((resolve, reject) => {
        let batches = utils.batchBySize(data.list, options.DATA_BATCH_SIZE);
        let accum = [];
        !function next() {
            if (batches.length) {
                accum = accum.concat(batches.pop().map(task.calc));
                setTimeout(next, 0);
            } else {
                let result = task.collect(accum);
                resolve({ result });
            }
        }();
    });
}