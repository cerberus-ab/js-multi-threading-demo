const http = require('http');
const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3001;

let usage = require('./node/usage.js');

// main page
app.get(/^\/(?:index)?$/, (req, res) => {
    res.sendFile(__dirname + '/web-resources/index.html');
});

// static resources
app.get(/^(.+?\.(?:js|css))$/, (req, res) => {
    res.sendFile(__dirname + req.params[0]); 
});


const server = http.createServer(app);
const channel = new WebSocket.Server({ server });

let concumers = [];

channel.on('connection', socket => {
    let consumerIndex = -1;
    
    socket.on('message', msg => {
        let data = JSON.parse(msg);
        switch (data.type) {
            case 'hello':
                // register new consumer
                if (data.purpose === 'consume') {
                    consumerIndex = concumers.push(socket) - 1;
                }
                break;
            case 'logs':
                // proxy logs messages
                concumers.forEach(socket => socket.send(msg));
                break;
        }
    });
    socket.on('close', () => {
        if (consumerIndex !== -1) {
            concumers.splice(consumerIndex, 1);
        }
    });
    
});

// send stats by time
const TIME_SAMPLE_MS = 1_000;
(function sendStats() {
    usage(TIME_SAMPLE_MS).then(stats => {
        let msg = JSON.stringify({
            type: 'stats',
            stats
        });
        concumers.forEach(socket => socket.send(msg));
        sendStats();
    });
})();

server.listen(port, () => {
    console.log('Monitor on ' + port);
});

