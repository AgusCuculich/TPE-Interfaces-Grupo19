class Figure {


    //Figura generica, con atributos y comportamientos generales
    constructor(posX, posY, fill, context,draggable) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoEstilo = 'red'; //Se podria llevar a un metodo
        this.ctx = context;
        this.draggable = draggable;
    }


    //Cambiar el relleno de la figura
    setFill(fill){
        this.fill = fill;
    }

    //Mover la figura a un punto
    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }


    //Obtener posicion X
    getPosX(){
        return this.posX;
    }

    //Obtener posicion Y
    getPosY(){
        return this.posY;
    }

    //Obtener posicion global
    getPosition(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    //Comprueba si una figura se puede arrastrar
    isDraggable(){
        return this.draggable;
    }


    //Define si una figura se puede arrastrar o no
    setDraggableState(state){
        this.draggable = state;
    }

    getFill(){
        return this.fill;
    }

    //Cambia el atributo resaltado para determinar de que forma se dibujara
    setResaltado(state){
        this.resaltado = state;
    }

    //Dibuja la figura
    draw(){
        this.ctx.fillStyle = this.fill;

    }


    isPointInside(x,y){ }



    isInside(other) {

    }


    //Hace a la figura caer hasta la posicion vertical deseada
    //Utiliza animation frames para que la animacion se adecue al refresco el monitor
    descendTo(target_y, speed) {
        //Se define la funcion de animar como un bucle que decremente la posicion Y de la figura
        const animacionCaer = () => {
            if (this.posY < target_y) {
                speed *=1.04;   //Le multiplico la velocidad para simular aceleracion
                this.posY+= speed; // Speed es la cantidad de pixeles que se movera en cada iteracion
                drawFigure();

                // Solicito que la animacion continue su curso en el siguiente frame
                requestAnimationFrame(animacionCaer);
            }
        };

        //Inicio el primer frame de la animacion
        requestAnimationFrame(animacionCaer);
    }










}