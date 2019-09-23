function requestCompute(url, data) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(res => res.json())
            .then(resolve);
    });
}