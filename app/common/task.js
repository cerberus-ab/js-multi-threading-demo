let task = {
    
    calc: value => {
        let count = 1_000_000;
        let sum = 0;
        for (let i = 0; i !== count; i += 1) {
            sum += Math.floor(Math.random() * value) + 1;
        }
        return Math.round(sum / count);
    },
    
    collect: results => {
        return results.reduce((s, r) => s += r, 0);
    },
    
    execute: data => {
        return task.collect(data.map(task.calc));
    }
    
};

if (typeof exports !== 'undefined') {
    exports = module.exports = task;
}