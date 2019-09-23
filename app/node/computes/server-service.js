const settings = require('../../settings.json');
const task = require('../../common/task.js');
const { Worker } = require('worker_threads');

module.exports = function compute(data, options, log) {
    return new Promise((resolve, reject) => {
        let workersCount = options.workersCount || settings.DEFAULT_WORKERS_COUNT;
        let workerData = { workersCount, index: data.reqIndex, list: data.list };
        const worker = new Worker(__dirname + '/../worker-threads/master-thread.js', { workerData });
        
        worker.on('message', data => {
            switch (data.type) {
                case 'log':
                    log.send(data.text);
                    break;
                case 'done':
                    resolve({ result: data.result });
                    break;
            }
        });
    });
};