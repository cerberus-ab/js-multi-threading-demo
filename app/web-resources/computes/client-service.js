function compute(data, options, log) {
    return new Promise((resolve, reject) => {
        let workersCount = options.workersCount || settings.DEFAULT_WORKERS_COUNT;
        let worker = new Worker('/web-resources/web-workers/master-worker.js');
        
        worker.postMessage({ workersCount, list: data.list });
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