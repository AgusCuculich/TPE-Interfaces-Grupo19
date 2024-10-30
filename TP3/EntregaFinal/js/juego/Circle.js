class Circle {

    constructor(x, y , radius, imgSrc, conBorde) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.img = new Image();
        this.img.src = imgSrc;
        this.conBorde = conBorde;
        console.log("conBorde: " + this.conBorde);
    }

    draw(ctx) {
        // Asegura que la imagen se dibuje cuando esté cargada
        this.img.onload = () => {
            // context.drawImage(img, x, y, width, height)
            if (this.conBorde) {
                console.log("Dibujando borde...");
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.setLineDash([8, 10]);
                ctx.strokeStyle = "grey";
                ctx.lineWidth = 3;
                ctx.stroke();
                console.log("Borde dibujado.");
            }
            ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        };

        // Si la imagen ya está cargada, dibujarla inmediatamente
        if (this.img.complete) {
            ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
    }

}