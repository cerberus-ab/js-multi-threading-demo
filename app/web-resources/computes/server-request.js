function requestCompute(url, data, options) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(res => {
                if (!res.ok) {
                    reject(new Error(res.statusText));
                }
                return res.json();
            })
            .then(resolve)
            .catch(_ => reject(new Error('error')));

        // timeout
        if (options.REQUEST_TIMEOUT) {
            setTimeout(() => reject(new Error('timeout')), options.REQUEST_TIMEOUT);
        }
    });
}