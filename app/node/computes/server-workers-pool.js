const createPool = require('../workers-pool');
let pool = null;

module.exports = function compute(data, options, log) {
    if (!pool) {
        pool = createPool(__dirname + '/../worker-threads/pool-thread.js', options.WORKERS_COUNT, log);
    }
    return pool.compute(data);
}