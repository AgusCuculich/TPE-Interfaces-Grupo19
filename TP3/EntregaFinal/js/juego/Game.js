class Game{
    constructor(rows,columns){
        //CANVAS
        this.canvas = document.querySelector("#canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth= this.canvas.width;
        this.canvasHeight = this.canvas.height;


        const centro = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };


        //Variables del juego
        this.renderQueue = [];   //Lista de todas las figuras dibujadas
        this.board = new Board(120,150,'#FF5733',this.ctx,rows,columns, centro);
        this.renderBoard();
        this.currentPlayer = null;


        this.lastClickedFigure = null;   //Figura mas recientemente clickeada
        this.isMouseDown = false;    //Esta el mouse siendo presionado?


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
        for (let i = 0; i < this.renderQueue.length; i++){
            this.renderQueue[i].draw();  //Aprovecha binding dinamico para dibujar cualquier figura
        }
    }


    //Crea un rectangulo blanco que ocupa toda la pantalla (usado para limpiar el canvas)
    clearCanvas(){
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);
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
        }
        this.newFrame(); //Refresca la pantalla, creando un nuevo frame



    }



//Cuando el mouse se esta moviendo
//En cada frame, mientras mantenga el mouse apretado, actualizo la posicion y refresco la pantalla
    onMouseMove(e){
        if (this.isMouseDown && this.lastClickedFigure != null && this.lastClickedFigure.isDraggable(this.currentPlayer)){
            this.lastClickedFigure.setPosition(e.layerX,e.layerY);
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
                        validTurn = true;

                        //Alineo horizontalmente la ficha con el casillero
                        this.lastClickedFigure.posX = figure.posX;

                        //El propio casillero me indica en que columna estoy, asi que necesito saber
                        //en que fila va a caer la ficha
                        let target_row = this.board.findLandingRow(figure.getColPos());

                        //Una vez que tengo fila y columna, ya se a cual ficha vacia voy a viajar
                        let target_chip = this.board.getChip(target_row,figure.getColPos());


                        console.log("Figura soltada dentro de la columna: " + figure.getColPos());
                        this.moveToLastRenderPosition(this.lastClickedFigure);
                        this.board.putChip(target_row, figure.getColPos(), this.lastClickedFigure);


                        //Entonces, hago que la ficha descienda hasta la misma posicion Y que la ficha vacia
                        this.lastClickedFigure.descendTo(target_chip.getPosY(),5, ()=>{this.newFrame()}); //La funcion de animar necesita poder llamar al newFrame
                        this.lastClickedFigure.setDraggableState(false);

                        //Pasa el turno al siguiente jugador
                        this.swapCurrentPlayer();
                        console.log("Turno de: " + this.currentPlayer);
                        break;
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

    DEBUG_RENDERMATRIZ(){
        this.board.DEBUG_RENDERMATRIZ();
    }

    DEBUG_MATRIZELEMENTO(row,col){
        this.board.DEBUG_MATRIZELEMENTO(row,col);
    }


    start(){
        this.currentPlayer = "p1";
    }

    swapCurrentPlayer(){
        if (this.currentPlayer === "p1"){
            this.currentPlayer = "p2";
        }
        else if (this.currentPlayer === "p2"){
            this.currentPlayer = "p1";
        }
    }








}