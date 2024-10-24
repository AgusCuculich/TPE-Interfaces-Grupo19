class Game{
    constructor(rows,columns){
        //CANVAS
        this.canvas = document.querySelector("#canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth= this.canvas.width;
        this.canvasHeight = this.canvas.height;


        //Variables del juego
        this.renderQueue = [];   //Lista de todas las figuras dibujadas
        this.board = new Board(0,0,'#FF5733',this.ctx,rows,columns);
        this.renderBoard();


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
        if (clickFig != null && clickFig.isDraggable()){
            clickFig.setResaltado(true);
            this.lastClickedFigure = clickFig;
        }
        this.newFrame(); //Refresca la pantalla, creando un nuevo frame



    }



//Cuando el mouse se esta moviendo
//En cada frame, mientras mantenga el mouse apretado, actualizo la posicion y refresco la pantalla
    onMouseMove(e){
        if (this.isMouseDown && this.lastClickedFigure != null && this.lastClickedFigure.isDraggable()){
            this.lastClickedFigure.setPosition(e.layerX,e.layerY);
            this.newFrame();
        }
    }



//Cuando levanto el mouse, seteo como false
    onMouseUp(e){
        this.isMouseDown = false;

        if (this.lastClickedFigure != null){
            this.lastClickedFigure.setResaltado(false);




            for (let figure of this.renderQueue) {
                if (figure !== this.lastClickedFigure && figure.isInside(this.lastClickedFigure)) {
                    console.log("Figura soltada dentro de otra figura");
                    this.lastClickedFigure.descendTo(700,5);
                    this.lastClickedFigure.setDraggableState(false);
                }
            }
        }
        this.newFrame();
    }












}