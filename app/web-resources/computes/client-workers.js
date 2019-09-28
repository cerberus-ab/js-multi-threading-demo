function compute(data, options, log) {
    return new Promise((resolve, reject) => {
        let batches = utils.batch(data.list, Math.floor(data.list.length / options.WORKERS_COUNT));
        let accum = [];
        let responsed = 0;
        
        batches.forEach((batch, i) => {
            let worker = new Worker('/web-resources/web-workers/slave-worker.js');
            
            worker.postMessage({ batch, index: i + 1 });
            worker.onmessage = e => {
                switch (e.data.type) {
                    case 'log':
                        log.send(e.data.text);
                        break;
                    case 'done':
                        accum = accum.concat(e.data.result);
                        responsed += 1;
                        if (responsed === batches.length) {
                            let result = task.collect(accum);
                            resolve({ result });
                        }
                        break;
                }
            }
        });
    });
}