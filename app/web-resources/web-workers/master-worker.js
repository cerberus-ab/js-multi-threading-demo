self.importScripts('/common/utils.js');
self.importScripts('/common/task.js');

onmessage = e => {
    postMessage({ type: 'log', text: `Started master with ${e.data.workersCount} slaves` });
    let batches = utils.batchByCount(e.data.list, e.data.workersCount);
    let accum = [];
    let responsed = 0;
    
    batches.forEach((batch, i) => {
        let worker = new Worker('/web-resources/web-workers/slave-worker.js');
        
        worker.postMessage({ batch, index: i + 1 });
        worker.onmessage = e => {
            switch (e.data.type) {
                case 'log':
                    postMessage(e.data);
                    break;
                case 'done':
                    accum = accum.concat(e.data.result);
                    responsed += 1;
                    if (responsed === batches.length) {
                        let result = task.collect(accum);
                        postMessage({ type: 'log', text: 'Finished master' });
                        postMessage({ type: 'done', result });
                    }
                    break;
            }
        };
    });
};