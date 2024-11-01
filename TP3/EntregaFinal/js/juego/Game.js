class Game{
    constructor(){
        //CANVAS
        this.canvas = document.querySelector("#canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth= this.canvas.width;
        this.canvasHeight = this.canvas.height;


        //Variables del juego
        this.renderQueue = [];   //Lista de todas las figuras dibujadas
        this.board = null;

        this.currentPlayer = null;


        this.lastClickedFigure = null;   //Figura mas recientemente clickeada
        this.isMouseDown = false;    //Esta el mouse siendo presionado?


        // Cargar la imagen de fondo solo una vez
        this.bgImage = new Image();
        this.bgImage.src = "./img/ruta.png";

        // Esperar a que la imagen se cargue antes de iniciar el bucle de renderizado
        this.bgImage.onload = () => {
            this.newFrame();  // Empieza el bucle de animación cuando la imagen esté cargada
        };


        //Agregar los eventos que escuchan al mouse
        this.canvas.addEventListener('mousedown' , (e)=>{this.onMouseDown(e)}, false);  //Cuando presiono el mouse
        this.canvas.addEventListener('mouseup' , (e)=>{this.onMouseUp(e)}, false);  //Cuando suelto el mouse
        this.canvas.addEventListener('mousemove' , (e)=>{this.onMouseMove(e)}, false);  //Cuando muevo el mouse


        this.newFrame();
    }



    renderBoard(){
        let elements = this.board.createBoard();

        console.log("cola de renderizado");
        console.log(this.renderQueue);
        elements.forEach(element =>{

            this.renderQueue.push(element);
        });


    }

    addRender(element){
        this.renderQueue.push(element);
    }


    //Genera un nuevo fotograma, limpia la pantalla y dibuja todas las figuras de la lista
    newFrame(){
        this.clearCanvas();
        let arrOriginal = this.renderQueue;
        for (let i = 0; i < this.renderQueue.length; i++){
            if(this.renderQueue[i].getPosition() != arrOriginal[i].getPosition) {
                this.renderQueue[i].draw(this.ctx);
            }
        }
    }    


    // Dibuja el fondo solo usando la imagen previamente cargada
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // Limpiar antes de dibujar el fondo
        this.ctx.drawImage(this.bgImage, 0, 0, this.canvasWidth, this.canvasHeight);
    }


    //Recorro todas las figuras, y donde encuentra una clickeada la devuelvo
    findClickedFigure(x,y){
        for (let i = 0; i < this.renderQueue.length; i++){
            const element = this.renderQueue[i];
            if (element.isPointInside(x,y)){
                return element;
            }
        }
    }






//Estados del mouse



    //Cuando presiono el click del mouse
    onMouseDown(e){
        this.isMouseDown = true;

        //Quita el resultado de la ultima figura resaltada
        if (this.lastClickedFigure !=null){
            this.lastClickedFigure.setResaltado(false);
            this.lastClickedFigure = null;
        }

        //Encuentra la figura clickeada (si la hay) y la resalta
        let clickFig = this.findClickedFigure(e.layerX,e.layerY);
        if (clickFig != null && clickFig.isDraggable(this.currentPlayer)){
            clickFig.setResaltado(true);
            this.lastClickedFigure = clickFig;
            console.log(clickFig);
        }
        this.newFrame(); //Refresca la pantalla, creando un nuevo frame



    }



//Cuando el mouse se esta moviendo
//En cada frame, mientras mantenga el mouse apretado, actualizo la posicion y refresco la pantalla
    onMouseMove(e){
        if (this.isMouseDown && this.lastClickedFigure != null && this.lastClickedFigure.isDraggable(this.currentPlayer)){
            this.lastClickedFigure.setPosition(e.layerX,e.layerY);
            //console.table(this.lastClickedFigure);
            this.newFrame();
        }
    }



//Cuando levanto el mouse, seteo como false
    onMouseUp(e){
        this.isMouseDown = false;

        //Si tenia una figura clickeada, le quito el resaltado
        if (this.lastClickedFigure != null){
            this.lastClickedFigure.setResaltado(false);


            let validTurn = false;
            for (let figure of this.renderQueue) {

                //Cuando suelto una ficha en otro elemento
                if (figure !== this.lastClickedFigure && figure.encloses(this.lastClickedFigure)) {
                    //Si es un casillero
                    if (figure.getSlot()){


                        //Alineo horizontalmente la ficha con el casillero
                        this.lastClickedFigure.x = figure.x;

                        //El propio casillero me indica en que columna estoy, asi que necesito saber
                        //en que fila va a caer la ficha
                        let target_row = this.board.findLandingRow(figure.getColPos());
                        if (target_row >=0){
                            validTurn = true;
                            //Una vez que tengo fila y columna, ya se a cual ficha vacia voy a viajar
                            let target_chip = this.board.getChip(target_row,figure.getColPos());

                            this.moveToLastRenderPosition(this.lastClickedFigure);
                            console.log(this.board.findLandingRow(figure.getColPos()));
                            this.board.putChip(target_row, figure.getColPos(), this.lastClickedFigure);
    
                            //Entonces, hago que la ficha descienda hasta la misma posicion Y que la ficha vacia
                            this.lastClickedFigure.descendTo(target_chip.getPosY(),5, ()=>{this.newFrame()}); //La funcion de animar necesita poder llamar al newFrame
                            this.lastClickedFigure.setDraggableState(false);
    
                            // verificar ganador
                            this.board.checkHorizontal(target_row, this.currentPlayer, figure.getColPos());
                            this.board.checkVertical(target_row, this.currentPlayer, figure.getColPos())
                            this.board.checkDiagonal(target_row, this.currentPlayer, figure.getColPos())
    
                            //Pasa el turno al siguiente jugador
                            this.swapCurrentPlayer();
                            break;
                        }
                    }
                }
            }
            if (!validTurn){
                this.lastClickedFigure.setPosition(this.lastClickedFigure.startingPosX,this.lastClickedFigure.startingPosY);
            }
        }

        this.newFrame();
    }



    moveToLastRenderPosition(element){
        for(let i = 0; i < this.renderQueue.length;i++){
            if (this.renderQueue[i] === element){
                let aux = this.renderQueue[i];
                this.renderQueue.splice(i,1);
                this.renderQueue.push(element);
            }
        }
    }

    start(rows,columns){
        this.currentPlayer = "p1";
        const centro = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
        this.board = new Board(rows,columns, centro, this.canvas.width, this.canvas.height);
        this.renderBoard();
        this.newFrame();
    }

    swapCurrentPlayer(){
        if (this.currentPlayer === "p1"){
            this.currentPlayer = "p2";
        }
        else if (this.currentPlayer === "p2"){
            this.currentPlayer = "p1";
        }
        console.log("jugador actual: " + this.currentPlayer);
    }
}