class Chip extends Drawable {
    constructor(posX, posY, radius, fill, context, draggable,isFree,player,rowPos=null,colPos=null, slot= false) {
        super(posX,posY,fill,context);
        this.radius = radius;


        this.draggable = draggable;
        this.isFree = isFree;
        this.player = player;
        this.slot = slot;

        //Posicion en la matriz de tablero
        this.rowPos = rowPos;
        this.colPos = colPos;



    }


    isEmpty(){
        return this.isFree;
    }


    getRowPos(){
        return this.rowPos;
    }

    getColPos(){
        return this.colPos;
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
    encloses(other) {
        const { x, y } = other.getPosition();   //Traigo la posicion de la otra figura
        const distance = Math.sqrt(     //Calculo la distancia entre las figuras
            Math.pow(this.posX - x, 2) + Math.pow(this.posY - y, 2)
        );

        //Calcula ya sea el radio o el mayor lado (para crear el area que se considera "dentro")
        const otherRadius = other.getRadius ? other.getRadius() : Math.max(other.getWidth(), other.getHeight()) / 2;

        //Si el radio es menor, está dentro
        return distance + otherRadius <= this.radius;
    }



    //Hace al elemento caer hasta la posicion vertical deseada
    //Utiliza animation frames para que la animacion se adecue al refresco el monitor
    descendTo(target_y, speed, renderCallBack) {
        //Se define la funcion de animar como un bucle que decremente la posicion Y del elemento
        const animacionCaer = () => {
            if (this.posY < target_y) {
                speed *= 1.04;
                this.posY+= speed; // Speed es la cantidad de pixeles que se movera en cada iteracion

                if (this.posY > target_y){
                    this.posY = target_y;
                }
                if (renderCallBack) {
                    renderCallBack();  // Llama a la función de render en cada frame
                }

                // Solicito que la animacion continue su curso en el siguiente frame
                requestAnimationFrame(animacionCaer);
            }
        };

        //Inicio el primer frame de la animacion
        requestAnimationFrame(animacionCaer);
    }

    getSlot(){
        return this.slot;
    }

    isDraggable(player){
        return this.draggable && (this.player === player);
    }

}