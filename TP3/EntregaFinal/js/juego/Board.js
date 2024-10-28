class Board extends Drawable{

    constructor(posX, posY, fill, context,rows, columns, centro){
        super(posX,posY ,fill ,context );
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];
        this.centroTablero = centro;
        
        console.table(centro);
    }



    createBoard(){

        //Lista de elementos del tablero que el juego debera dibujar
        let boardElements = [];

        // 60 siendo el lugar que ocupa cada ficha, y la otra sumando sirve para el margen
        let anchoTablero = this.columns * 60 + this.columns * 60;   // anchoColumnas
        let alturaTablero = this.rows * 60 + this.rows * 30;    // anchoFilas

        // calculo para obtener las coordenadas donde empezará a deibujarse el rectángulo.
        // Para eso, a la posición x del centro del tablero le restamos la mitad del ancho del mismo
        //(lo mismo para y)
        const startX = this.centroTablero.x - anchoTablero / 2;
        const startY = this.centroTablero.y - alturaTablero / 2.5;
        console.log(startX);
        console.log(startY);

        //Tablero amarillo
        let board = new Rect(startX, startY, anchoTablero, alturaTablero, "yellow", this.ctx, false);
        boardElements.push(board);

        // Calcular el tamaño de cada celda
        const cellWidth = anchoTablero / this.columns;
        // Divide el ancho total del tablero entre el número de columnas, para obtener el ancho de cada celda.
        const cellHeight = alturaTablero / this.rows;
        // Divide la altura total del tablero entre el número de filas, para obtener la altura de cada celda.

        console.log("cellWidth: " + cellWidth);
        console.log("cellHeight: " + cellHeight);

        //Calcular la cantidad maxima de fichas que tendra cada jugador (varia segun tablero)
        const maxChips = Math.ceil((this.rows * this.columns) / 2);


        //Slots (casilleros donde se puede meter una ficha) --> circulos verdes originales

        for (let i = 0; i < this.columns; i++){
            let x = startX + i * cellWidth + cellWidth / 2;
            let slot = new Chip(x,startY - 60 ,50,"green",this.ctx,false,false,null,null,i,true);
            boardElements.push(slot);
        }




        //Fichas vacias
        for (let i = 0; i < this.rows; i++) {
            const fila = []; // Crear fila
            for (let j = 0; j < this.columns; j++) {
                let posX = startX + j * cellWidth + cellWidth / 2;
                let posY = startY + i * cellHeight + cellHeight / 2;
                let color = "#000000";
                let radius = 30;


                let chip = new Chip(posX,posY, radius, color, this.ctx,false,true,null,i,j);
                fila.push(chip);
                boardElements.push(chip);
                console.log(chip.getSlot());


            }
            this.matrix.push(fila); // Agregar la fila creada a la matriz
        }


        //Crear fichas de jugadores
        for (let i = 0; i < maxChips; i++){

            //Jugador 1
            let p1_chip = new Chip(startX - 60, i*10 + this.centroTablero.y ,30,"#804000",this.ctx,true,false,"p1");

            //Jugador 2
            let p2_chip = new Chip(startX + anchoTablero + 60, i * 10 + this.centroTablero.y,30,"red",this.ctx,true,false,"p2");


            boardElements.push(p1_chip);
            boardElements.push(p2_chip);
        }

        console.table(this.matrix);
        return boardElements;
    }


    //Calcular hasta que fila deberia caer la ficha (ya sabiendo su columna)

    findLandingRow(col) {
        let i = 0;
        while (i < this.rows) {

            if (!this.matrix[i][col].isEmpty()) {
                return i - 1; // Cuando detecta una fila ocupada,devuelve la de arriba
            }
            i++;
        }
        // Si la ultima fila tambien esta vacia, devuelvo esa
        return this.rows - 1;
    }


    getChip(row,column){
        return this.matrix[row][column];
    }

    putChip(row,column, element){
        this.matrix[row][column] = element;
    }




    DEBUG_RENDERMATRIZ(){
        console.table(this.matrix);
    }

    DEBUG_MATRIZELEMENTO(row,col){
        console.log(this.matrix[row][col]);
    }

}