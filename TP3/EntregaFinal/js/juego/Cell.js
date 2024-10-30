class Cell {
    constructor(x, y, size, imgSrc) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.img = new Image();
        this.img.src = imgSrc; 
    }

    draw(ctx) {
        // Asegura que la imagen se dibuje cuando esté cargada
        this.img.onload = () => {
            // context.drawImage(img, x, y, width, height)
            ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
        };

        // Si la imagen ya está cargada, dibujarla inmediatamente
        if (this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
        }
    }
}
