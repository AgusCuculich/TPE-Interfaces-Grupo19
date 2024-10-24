class CarritoCard extends FreeCard {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        // Renderiza el contenido del componente directamente en el elemento
        this.innerHTML = `
                <div class="card en-carrito">
                    <div class="card-img">
                        <img src="${this.img}" alt="">
                    </div>
                    <p class="card-titulo-solo">${this.titulo}</p>
                </div>
        `;
    }
}

customElements.define("carrito-card", CarritoCard);