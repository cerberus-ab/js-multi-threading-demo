const { workerData, parentPort } = require('worker_threads');
const task = require('../../common/task.js');

parentPort.on('message', data => {
    parentPort.postMessage({ type: 'log', text: `Started pool worker #${workerData.index}` });
    let result = task.execute(data.list);
    parentPort.postMessage({ type: 'log', text: `Finished pool worker #${workerData.index}` });
    parentPort.postMessage({ type: 'done', result, reqIndex: data.reqIndex });
});