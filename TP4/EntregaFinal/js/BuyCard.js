class BuyCard extends FreeCard {
    constructor() {
        super();
    }

    connectedCallback() {
        this.precio = this.getAttribute("precio");
        super.connectedCallback();
    }

    render() {
        // Renderiza el contenido del componente directamente en el elemento
        this.innerHTML = `
            <div class="card">
            <div class="card-img">
                <img src="${this.img}" alt="Imagen del producto">
                <p class="card-precio">${this.precio}</p>
            </div>
            <p class="card-titulo">${this.titulo}</p>
            <button class="btn-carrito">Añadir al carrito</button>
            </div>
        `;
    }
}

customElements.define("buy-card", BuyCard);