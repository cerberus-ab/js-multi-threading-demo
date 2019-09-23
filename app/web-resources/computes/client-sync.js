function compute(data, options, log) {
    return Promise.resolve({ result: task.execute(data.list) });
}