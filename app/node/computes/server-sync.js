const task = require('../../common/task.js');

module.exports = function compute(data, options, log) {
    return Promise.resolve({ result: task.execute(data.list) });
};