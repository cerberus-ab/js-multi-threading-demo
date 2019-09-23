const { workerData, parentPort } = require('worker_threads');
const task = require('../../common/task.js');

parentPort.postMessage({ type: 'log', text: `Started slave #${workerData.index}` });
let result = workerData.batch.map(task.calc);
parentPort.postMessage({ type: 'log', text: `Finished slave #${workerData.index}` });
parentPort.postMessage({ type: 'done', result });