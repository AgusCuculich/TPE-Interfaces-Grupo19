//Representa una celda de tablero. Un tablero se compone por multiples instancias de estas celdas
class Cell {
    constructor(x, y, size, imgSrc) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.img = new Image();
        this.img.src = imgSrc; 
    }

    getPosX(){
        return this.x;
    }

    getPosY(){
        return this.y;
    }

    //Obtener posicion global
    getPosition(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    getSlot(){
        return false;
    }

    draw(ctx) {
        // Si la imagen ya está cargada, dibujarla inmediatamente
        if (this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
        }
    }

    //Comprueba si la posicion dada se encuentra dentro del rectangulo
    isPointInside(x,y){
        return !(x < this.x || x > this.x + this.width || y < this.y || y > this.y + this.height);
    }

    isDraggable(player){
        return false;
    }

    encloses(other) {
        return false;
    }

}
