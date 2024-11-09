const DEFAULT_NAME = "Placeholder";

class FreeCard extends HTMLElement {
    constructor() {
        super();
        // No se necesita el attachShadow si no estás usando Shadow DOM
    }

    connectedCallback() {
        // Acceder a los atributos en connectedCallback
        this.titulo = this.getAttribute("titulo") || DEFAULT_NAME;
        this.img = this.getAttribute("img-src") || "";

        this.render();
    }

    render() {
        // Renderiza el contenido del componente directamente en el elemento
        this.innerHTML = `
            <div class="card">
                <div class="card-img">
                    <img src="${this.img}" alt="Imagen del producto">
                </div>
                <p class="card-titulo">${this.titulo}</p>
                <button class="btn-jugar">Jugar ahora</button>
            </div>
        `;
    }
}

// Asocia la etiqueta HTML custom con la clase que hemos definido.
customElements.define("free-card", FreeCard);
