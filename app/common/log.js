function createLog(channelUrl, context) {
    let socket = null;
    
    const econnrefused = () => console.warn('Logs channel is not available');
    
    // initiate socket for client
    if (typeof window !== 'undefined') {
        socket = new WebSocket(channelUrl);
        socket.onerror = econnrefused;
    } 
    // initiate socket for server
    else {
        const WebSocket = require('ws');
        socket = new WebSocket(channelUrl);
        socket.on('error', econnrefused);
    }
    
    return {
        send: msg => {
            console.log(msg);
            if (socket && socket.readyState === 1) {
                socket.send(JSON.stringify({
                    type: 'logs',
                    context,
                    strings: [msg]
                }));
            }
        }
    };
}

if (typeof exports !== 'undefined') {
    exports = module.exports = createLog;
}