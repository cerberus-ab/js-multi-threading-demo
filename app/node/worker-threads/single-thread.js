const { workerData, parentPort } = require('worker_threads');
const task = require('../../common/task.js');

parentPort.postMessage({ type: 'log', text: `Started worker #${workerData.index}` });
let result = task.execute(workerData.list);
parentPort.postMessage({ type: 'log', text: `Finished worker #${workerData.index}` });
parentPort.postMessage({ type: 'done', result });