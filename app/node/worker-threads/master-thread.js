const { workerData, parentPort, Worker } = require('worker_threads');
const utils = require('../../common/utils.js');
const task = require('../../common/task.js');

let requestIndex = workerData.index;
parentPort.postMessage({ type: 'log', text: `Started master ${requestIndex} with ${workerData.workersCount} slaves` });
let batches = utils.batch(workerData.list, Math.floor(workerData.list.length / workerData.workersCount));
let accum = [];
let responsed = 0;

batches.forEach((batch, i) => {
    let workerData = { batch, index: `${requestIndex}.${(i + 1)}` };
    let worker = new Worker(__dirname + '/slave-thread.js', { workerData });
    
    worker.on('message', data => {
        switch (data.type) {
            case 'log':
                parentPort.postMessage(data);
                break;
            case 'done':
                accum = accum.concat(data.result);
                responsed += 1;
                if (responsed === batches.length) {
                    let result = task.collect(accum);
                    parentPort.postMessage({ type: 'log', text: `Finished master ${requestIndex}` });
                    parentPort.postMessage({ type: 'done', result });
                }
                break;
        }
    });
});