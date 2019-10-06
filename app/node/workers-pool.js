const { Worker } = require('worker_threads');

module.exports = function createPool(script, count, log) {
    let workers = [];
    let cursor = 0;
    
    for (let i = 0; i != count; i += 1) {
        const worker = new Worker(script, { workerData: { index: i + 1 }});
        worker.on('message', data => {
            if (data.type === 'log') {
                log.send(data.text);
            }
        });
        workers.push(worker);
    }
    log.send(`Init pool with ${count} workers`);
    
    return {
        compute: args => new Promise((resolve, reject) => {
            let worker = workers[cursor];
            cursor = (cursor + 1 < workers.length) ? cursor + 1 : 0;
            
            worker.on('message', data => {
                if (data.type === 'done' && args.reqIndex === data.reqIndex) {
                    resolve({ result: data.result });
                }
            });
            worker.postMessage(args);
        })
    };
};