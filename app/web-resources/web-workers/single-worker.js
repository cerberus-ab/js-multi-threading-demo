self.importScripts('/common/task.js');

onmessage = e => {
    postMessage({ type: 'log', text: 'Started worker' });
    let result = task.execute(e.data.list);
    postMessage({ type: 'log', text: 'Finished worker' });
    postMessage({ type: 'done', result });
};