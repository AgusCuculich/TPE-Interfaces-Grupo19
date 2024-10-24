class Rect extends Figure {
    constructor(posX,posY,width,height,fill,context,draggable) {
        super(posX,posY,fill,context, draggable);

        this.width = width;
        this.height = height;
    }


    //Dibuja un rectangulo en un punto, segun su ancho y alto
    draw(){
        super.draw();
        this.ctx.fillRect(this.posX,this.posY,this.width,this.height);

        //Borde default
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(this.posX, this.posY, this.width, this.height); // Dibujar un rectángulo con contorno



        //Aplicar borde rojo si esta resaltado

        if (this.resaltado === true){
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 10;
            this.ctx.strokeRect(this.posX,this.posY,this.width,this.height);
        }




    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }



    //Comprueba si la posicion dada se encuentra dentro del rectangulo
    isPointInside(x,y){
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
    }




    //Comprueba si esta figura esta dentro de otra figura
    isInside(other) {
        const { x, y } = other.getPosition();   //Obtengo la posicion de la otra figura

        //Si tiene radio, lo uso, sino, uso los lados
        const right = x + (other.getRadius ? other.getRadius() : other.getWidth());
        const bottom = y + (other.getRadius ? other.getRadius() : other.getHeight());


        //Este booleano comprueba si estoy dentro de la figura, ya sea cuadrado o circulo
        return (
            x >= this.posX &&
            y >= this.posY &&
            right <= this.posX + this.width &&
            bottom <= this.posY + this.height
        );
    }


    //Hago que el rectagulo siempre quede centrado respecto al mouse
    setPosition(x,y){
        this.posX = x-this.width/2;
        this.posY = y-this.height/2;
    }







}