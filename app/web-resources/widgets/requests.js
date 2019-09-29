function createWidgetRequests($container, options) {
    let data = {
        start: 0,
        count: options.requestsCount,
        requests: utils.range(options.requestsCount).map(index => {
            return { index, send: 0, recv: 0, status: undefined };
        }),
        fin: 0
    };

    const render = () => {
        $container.innerHTML = `
            <div class="requests">${
                data.requests.map(req => {
                    return `
                    <div class="requests__el requests-entry">
                        <div class="requests-entry-title">
                            <p class="requests-entry-title__text">Request ${req.index}:</p>
                        </div>
                        <div class="requests-entry-line">${
                            (function() {
                                if (!req.recv) {
                                    return `
                                    <div class="requests-entry-line-status">
                                        <p class="requests-entry-line-status__text">${
                                            (data.start && req.send) ? '(pending)' : '(waiting)'
                                        }</p>
                                    </div>
                                    `;
                                } else {
                                    return `
                                    <div class="requests-entry-line-times">
                                        <div class="requests-entry-line-times-t" style="width: ${
                                            100 * (req.send / data.fin)
                                        }%;"></div>
                                        <div class="requests-entry-line-times-t ${req.status !== 'ok' ? '-failure' : '-success'}" style="width: ${
                                            100 * ((req.recv - req.send) / data.fin)
                                        }%;"><span>${
                                            req.status !== 'ok' ? req.status : ((req.recv - req.send) + ' ms')
                                        }</span></div>
                                    </div>
                                    `;
                                }
                            })()
                        }</div>
                    </div>
                    `;
                }).join('')
            }</div>
        `;
    };
    
    const setTime = (index, direction, status = 'ok') => {
        let request = data.requests.find(req => req.index === index);
        request[direction] = (+new Date - data.start);
        if (direction === 'recv') {
            request.status = status;
            data.fin = Math.max(...data.requests.map(req => req.recv));
        }
        render();
    };

    return {
        render,
        
        init: () => {
            data.start = +new Date;
            data.requests.forEach(req => {
                req.send = 0;
                req.recv = 0;
            });
            render();
        },
        timeSend: index => setTime(index, 'send'),
        timeRecv: (index, status) => setTime(index, 'recv', status),
        
        indices: () => {
            return data.requests.map(req => req.index);
        }
    };
}