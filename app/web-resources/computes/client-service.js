function compute(data, options, log) {
    return new Promise((resolve, reject) => {
        let worker = new Worker('/web-resources/web-workers/master-worker.js');
        
        worker.postMessage({ workersCount: options.WORKERS_COUNT, list: data.list });
        worker.onmessage = e => {
            switch (e.data.type) {
                case 'log':
                    log.send(e.data.text);
                    break;
                case 'done':
                    resolve({ result: e.data.result });
                    break;
            }
        };
    });
}