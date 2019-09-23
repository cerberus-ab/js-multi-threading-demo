window.addEventListener('load', () => {
    document.addEventListener('click', e => {
        let el = e.target.closest('[data-href]');
        if (el) {
            window.location = el.getAttribute('data-href');
        }
    });
});
