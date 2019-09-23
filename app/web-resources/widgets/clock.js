function createWidgetClock($container, options) {
    let value = 0;

    const render = () => {
        $container.innerHTML = `
            <div class="clock">
                <p class="clock__title">${options.title}</p>
                <p class="clock__value">${value}</p>
            </div>
        `;
    };

    return {
        render,
        
        init: () => {
            value = 0;
            render();
        },
        inc: () => {
            value += 1;
            render();
        }
    };
}