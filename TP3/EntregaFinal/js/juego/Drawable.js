class Drawable {


    //Representa un elemento dibujable en una determinada posicion, en determinado contexto
    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoEstilo = 'red'; //Se podria llevar a un metodo
        this.ctx = context;
    }


    //Cambiar el relleno del elemento
    setFill(fill){
        this.fill = fill;
    }

    //Mover el elemento a un punto
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

    //Comprueba si este elemento se puede arrastrar
    isDraggable(){
        return this.draggable;
    }


    //Define si este elemento se puede arrastrar o no
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

    //Dibuja la el elemento
    draw(){
        this.ctx.fillStyle = this.fill;

    }


    isPointInside(x,y){ }



    encloses(other) {

    }













}