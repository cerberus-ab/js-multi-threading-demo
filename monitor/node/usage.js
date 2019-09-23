const os = require('os');

const sumt = cpu => Object.values(cpu.times).reduce((s, t) => s += t, 0);

const countp = (begCpu, endCpu) => {
    let total = sumt(endCpu) - sumt(begCpu);
    let idle = endCpu.times.idle - begCpu.times.idle;
    return +(100 * (total - idle) / total).toFixed(1);
};

// returns api
module.exports = function usage(sample = 1_000) {
    return new Promise((resolve, reject) => {
        let begCpus = os.cpus();
        
        setTimeout(() => {
            let endCpus = os.cpus();
            let cpus = begCpus.map((begCpu, i) => countp(begCpu, endCpus[i]));
            resolve({ cpus, cores: cpus.length });
        }, sample); 
    });
};