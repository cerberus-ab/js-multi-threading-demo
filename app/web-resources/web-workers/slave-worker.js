self.importScripts('/common/task.js');

onmessage = e => {
    postMessage({ type: 'log', text: `Started slave #${e.data.index}` });
    let result = e.data.batch.map(task.calc);
    postMessage({ type: 'log', text: `Finished slave #${e.data.index}` });
    postMessage({ type: 'done', result });
};