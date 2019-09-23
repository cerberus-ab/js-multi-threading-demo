function createWidgetStats($contaier, options) {
    let stats = { cpus: [], cores: 0 };
    
    const render = () => {
        $contaier.innerHTML = `
            <div class="cpus">${
                stats.cpus.map((val, i) => {
                    return `
                    <div class="cpus__el cpus-core">
                        <div class="cpus-core__index">${i + 1}</div>
                        <div class="cpus-core__bar">
                            <div class="cpus-core__bar-fill" style="width: ${val}%;"></div>
                        </div>
                        <div class="cpus-core__value">${val}%</div>
                    </div>
                    `;
                }).join('')
            }</div>
        `;
    };
    
    return {
        render,
        
        update: recvStats => {
            stats = Object.assign({}, recvStats);
            render();
        }
    };
}