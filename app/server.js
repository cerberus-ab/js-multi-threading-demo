const express = require('express');
const ejs = require('ejs');
const settings = require('./settings.json');
const solutions = require('./solutions.json').filter(s => !s.hidden);
const log = require('./common/log.js')(settings.LOGS_CHANNEL_URL, 'server');
const utils = require('./common/utils.js');

const app = express();
const port = 3000;

app.use(express.json());

// home page (index)
app.get(/^\/(?:home)?$/, (req, res) => {
    ejs.renderFile(__dirname + '/web-resources/home.ejs', { solutions }, {}, (err, content) => {
        res.end(content);
    });
});

// generic demo page
app.get(/^(\/demo\/(?:.+))$/, (req, res) => {
    let solution = solutions.find(sol => sol.path === req.params[0]);
    if (!solution) {
        res.status(404).end('Demo not found');
    }
    ejs.renderFile(__dirname + '/web-resources/demo.ejs', { solution, settings }, {}, (err, content) => {
        res.end(content);
    });
});

// static resources
app.get(/^(.+?\.(?:js|css))$/, (req, res) => {
    res.sendFile(__dirname + req.params[0]); 
});

// generate api for server's solutions
solutions.filter(s => s.type === 'server').forEach(solution => {
    const compute = require('./node/' + solution.compute);
    const options = Object.assign({}, settings.defaultOptions, solution.options || {});
    
    app.post(solution.api, (req, res) => {
        let reqIndex = req.body.index;
        let list = utils.range(options.DATA_SEED);
        let beg = +new Date;
        
        log.send(`Start compute ${reqIndex}`);
        compute({ list, reqIndex }, options, log).then(data => {
            log.send(`Done compute ${reqIndex} with ${data.result} (${+new Date - beg} ms)`);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ result: data.result }));
        });
    });
});

app.listen(port, () => {
    console.log('Server on ' + port);
});

/**
 * Starts the server in cluster mode (for testing now)
 *
 * It spawns child processes for core-clustering of the service;
 * makes sense for single-threaded & server-side solutions based demos.
 *
 * TODO: prepare the cluster mode as a regular solution
 *
const cluster = require('cluster');

if (cluster.isMaster) {
    console.log(`Master ${process.pid} started on ${port}`);
    const cpus = require('os').cpus().length;
    for (let i = 0; i != cpus; i += 1) {
        cluster.fork();
    }
} else {
    app.listen(port, () => {
        console.log(`Fork ${process.pid} started`);
    });
}
 */