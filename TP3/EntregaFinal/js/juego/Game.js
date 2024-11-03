//Representa el juego, controla los parametros y estado del mismo, y asigna los eventos para los inputs del jugador

class Game{
    constructor(targetScore,p1_path,p2_path){
        //CANVAS
        this.canvas = document.querySelector("#canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth= this.canvas.width;
        this.canvasHeight = this.canvas.height;


        //Variables del juego
        this.renderQueue = [];   //Lista de todas las figuras dibujadas
        this.board = null;       //Tablero

        this.currentPlayer = null;  //Jugador en este turno
        this.timerInterval = null;
        this.targetScore = targetScore; //Cantidad de fichas agrupadas para ganar

        //Imagenes de las fichas
        this.p1_path = p1_path;
        this.p2_path = p2_path;


        this.lastClickedFigure = null;   //Figura mas recientemente clickeada
        this.isMouseDown = false;    //Esta el mouse siendo presionado?
        this.playerText = new Text(50,50,"#FFFFFF",this.ctx,"Texto default");  //Texto informativo
        this.playerText.changeFont("50px serif");
        this.renderQueue.push(this.playerText);



        // Cargar la imagen de fondo solo una vez
        this.bgImage = new Image();
        this.bgImage.src = "./img/ruta.png";

        // Esperar a que la imagen se cargue antes de iniciar el bucle de renderizado
        this.bgImage.onload = () => {
            this.newFrame();  // Empieza el bucle de animación cuando la imagen esté cargada
        };


        //Eventos que escuchan al mouse
        this.canvas.addEventListener('mousedown' , (e)=>{this.onMouseDown(e)}, false);  //Cuando presiono el mouse
        this.canvas.addEventListener('mouseup' , (e)=>{this.onMouseUp(e)}, false);  //Cuando suelto el mouse
        this.canvas.addEventListener('mousemove' , (e)=>{this.onMouseMove(e)}, false);  //Cuando muevo el mouse


        this.newFrame();
    }




    //Crea y dibuja el tablero del juego
    renderBoard(){
        let elements = this.board.createBoard(this.p1_path,this.p2_path);

        console.log("cola de renderizado");
        console.log(this.renderQueue);
        elements.forEach(element =>{

            this.renderQueue.push(element);
        });


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



    //Al presionar el mouse, se busca la figura clikeada, la resalta, y la asigna como ultima figura presionada
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
            this.newFrame();
        }
    }



//Al levantar el mouse, quitamos el resaltado de la ficha, y empezamos a realizar las comprobaciones del juego.
    //Si es una posicion valida, ingresamos la ficha y comprobamos si hay ganador.
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
                            let h_check = this.board.checkHorizontal(target_row, this.currentPlayer, figure.getColPos(),this.targetScore);
                            let v_check = this.board.checkVertical(target_row, this.currentPlayer, figure.getColPos(),this.targetScore);
                            let d_check = this.board.checkDiagonal(target_row, this.currentPlayer, figure.getColPos(),this.targetScore);

                            //Si se hizo N en linea, muestro el ganador por pantalla
                            if (h_check || v_check || d_check){


                                this.playerText.changeText("¡"+this.currentPlayer + " Gana!");

                                this.newFrame();
                                this.stop();
                            }
                            else{
                                this.swapCurrentPlayer();
                            }

                            //Pasa el turno al siguiente jugador

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



    //Mueve un elemento al final de renderQueue, haciendo que se dibuje siempre por encima
    moveToLastRenderPosition(element){
        for(let i = 0; i < this.renderQueue.length;i++){
            if (this.renderQueue[i] === element){
                let aux = this.renderQueue[i];
                this.renderQueue.splice(i,1);
                this.renderQueue.push(element);
            }
        }
    }


    //Comienza la partida, seteando los parametros iniciales y crenado el tablero
    start(rows, columns) {
        this.createNavButtons();
        this.currentPlayer = "Jugador 1";
        this.playerText.changeText("Turno de: " + this.currentPlayer);

        const centro = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };

        this.board = new Board(rows, columns, centro, this.canvas.width, this.canvas.height);
        this.renderBoard();

        // Guarda el ID del intervalo en `timerInterval`
        this.timerInterval = setInterval(() => {
            this.decreaseTimer();
        }, 1000);

        this.newFrame();
    }


    //Frena el juego, impidiendo que se puedan realizar mas movimientos
    stop() {
        console.log("Intentando frenar el juego");
        this.newFrame();

        // Desactiva la capacidad de arrastrar de los elementos en renderQueue
        this.renderQueue.forEach(element => {
            element.draggable = false;
        });

        // Limpia el intervalo para detener el temporizador
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            console.log("Intervalo de temporizador detenido.");
        }

        console.log("Partida finalizada. Desactivados objetos");

    }


    //Crea los botones para reiniciar partida e ir al menu principal
    createNavButtons(){
        let gameRender = document.querySelector(".render-juego");
        const btn_menu = document.createElement("button");
        btn_menu.classList.add("btn-menu-juego");
        btn_menu.textContent = "Menu";
        btn_menu.addEventListener("click", ()=>{
            location.reload();

        })

        const btn_reset = document.createElement("button");
        btn_reset.classList.add("btn-reset-juego");
        btn_reset.textContent = "Reiniciar";
        btn_reset.addEventListener("click", ()=>{
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
            gameRender.innerHTML = "";
            const canvas = document.createElement('canvas');
            canvas.id = 'canvas';
            canvas.width = 1479;
            canvas.height = 720;
            canvas.style.border = '1px solid black';


            gameRender.appendChild(canvas);

            const timerText = document.createElement("h3");
            timerText.textContent = "200";
            timerText.classList.add("timer");
            gameRender.appendChild(timerText);

            let juego = new Game(this.targetScore, this.p1_path,this.p2_path);
            juego.start(this.board.getRows(),this.board.getColumns());
        })

        gameRender.appendChild(btn_menu);
        gameRender.appendChild(btn_reset);
    }

    //Decrementa el timer de tiempo restante
    decreaseTimer() {
        const timerText = document.querySelector(".timer");
        let time = Number(timerText.textContent);
        if(time < 1){
            this.playerText.changeText("Se ha acabado el tiempo");
            this.stop();
        }
        else{
            time--;
            timerText.textContent = time;
        }

    }


    //Le da el turno al otro jugador
    swapCurrentPlayer(){
        if (this.currentPlayer === "Jugador 1"){
            this.currentPlayer = "Jugador 2";
        }
        else if (this.currentPlayer === "Jugador 2"){
            this.currentPlayer = "Jugador 1";
        }
        console.log("jugador actual: " + this.currentPlayer);

        this.playerText.changeText("Turno de: " + this.currentPlayer);
    }
}