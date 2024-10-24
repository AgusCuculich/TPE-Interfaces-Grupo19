class Chip extends Drawable {
    constructor(posX, posY, radius, fill, context, draggable) {
        super(posX,posY,fill,context);
        this.draggable = draggable;

        this.radius = radius;
    }



    draw() {
        super.draw();
        this.ctx.beginPath();   //Al tratarse de una figura compleja, indicamos que trazaremos un camino
        this.ctx.arc(this.posX,this.posY,this.radius,0,2*Math.PI);  //Trayectoria del camino
        this.ctx.fill();    //Dibujamos el camino (antes solo existia "en la imaginacion" del programa)

        //Contorno
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        //Aplicar borde si esta resaltado

        if (this.resaltado === true){
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 10;
            this.ctx.stroke();
        }

        this.ctx.closePath(); //Indicamos que ya terminamos con este camino


    }

    getRadius(){
        return this.radius;
    }


    //Calcula la distancia entre el centro del circulo y la posicion dada
    //Una distancia menor al radio indica que seguimos dentro del circulo
    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;

        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }


    //Comprueba si esta figura esta dentro de otra figura
    isInside(other) {
        const { x, y } = other.getPosition();   //Traigo la posicion de la otra figura
        const distance = Math.sqrt(     //Calculo la distancia entre las figuras
            Math.pow(this.posX - x, 2) + Math.pow(this.posY - y, 2)
        );

        //Calcula ya sea el radio o el mayor lado (para crear el area que se considera "dentro")
        const otherRadius = other.getRadius ? other.getRadius() : Math.max(other.getWidth(), other.getHeight()) / 2;

        //Si el radio es menor, está dentro
        return distance + otherRadius <= this.radius;
    }


}