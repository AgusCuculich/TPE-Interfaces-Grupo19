class Board extends Drawable{

    constructor(posX, posY, fill, context,rows, columns, centro){
        super(posX,posY ,fill ,context );
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];
        this.centroTablero = centro;
    }



    createBoard(){

        //Lista de elementos del tablero que el juego debera dibujar
        let boardElements = [];

        // 60 siendo el lugar que ocupa cada ficha, y la otra sumando sirve para el margen
        let anchoTablero = this.columns * 60 + this.columns * 30;   // anchoColumnas
        let alturaTablero = this.rows * 60 + this.rows * 15;    // anchoFilas

        // calculo para obtener las coordenadas donde empezará a deibujarse el rectángulo.
        // Para eso, a la posición x del centro del tablero le restamos la mitad del ancho del mismo
        //(lo mismo para y)
        const startX = this.centroTablero.x - anchoTablero / 2;
        const startY = this.centroTablero.y - alturaTablero / 2.4;
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
            let slot = new Chip(x,startY - 50 ,45,"green",this.ctx,false,false,null,null,i,true);
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
            let p1_chip = new Chip(startX - 60, i*10 + this.centroTablero.y -30 ,30,"#804000",this.ctx,true,false,"p1");

            //Jugador 2
            let p2_chip = new Chip(startX + anchoTablero + 60, i * 10 + this.centroTablero.y - 30,30,"red",this.ctx,true,false,"p2");


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


    // Funciones para verificar ganador

    checkHorizontal(row, player, column) {
        let total = 1;
    
        // Contamos hacia la derecha desde la columna actual
        let rightColumn = column + 1;
        while (rightColumn < this.columns && this.matrix[row][rightColumn].getPlayer() == player) {
            total++;
            rightColumn++;
            //console.log("Jugador: " + player + " Total: " + total);
            if (total === 4) {
                return true;
            }
        }
    
        // Contamos hacia la izquierda desde la columna actual
        let leftColumn = column - 1;
        while (leftColumn >= 0 && this.matrix[row][leftColumn].getPlayer() == player) {
            total++;
            leftColumn--;
            console.log("total" + total);
            if (total === 4) {
                return true;
            }
        }
    
        // Si no se encontraron 4 consecutivas, devolvemos false
        return false;
    }


    checkVertical(row, player, column) {
        let total = 1;
    
        // Contamos hacia abajo desde la fila actual
        let belowRow = row + 1;
        while (belowRow < this.rows && this.matrix[belowRow][column].getPlayer() == player) {
            total++;
            belowRow++;
            console.log("Jugador: " + player + " Total: " + total);
            if (total === 4) {
                return true;
            }
        }
    
        // Contamos hacia arriba desde la fila actual
        let aboveRow = row - 1;
        while (aboveRow >= 0 && this.matrix[aboveRow][column].getPlayer() == player) {
            total++;
            aboveRow--;
            console.log("Jugador: " + player + " Total: " + total);
            if (total === 4) {
                return true;
            }
        }
    
        // Si no se encontraron 4 consecutivas, devolvemos false
        return false;
    }
    
    
    checkDiagonal(row, player, column) {
        let total = 1;
    
        // Diagonal descendente hacia la derecha (↘)
        let downRightRow = row + 1;
        let downRightCol = column + 1;
        while (downRightRow < this.rows && downRightCol < this.columns && this.matrix[downRightRow][downRightCol].getPlayer() == player) {
            total++;
            downRightRow++;
            downRightCol++;
            console.log("Jugador: " + player + " Total: " + total);
            if (total === 4) {
                return true;
            }
        }
    
        // Diagonal ascendente hacia la izquierda (↖)
        let upLeftRow = row - 1;
        let upLeftCol = column - 1;
        while (upLeftRow >= 0 && upLeftCol >= 0 && this.matrix[upLeftRow][upLeftCol].getPlayer() == player) {
            total++;
            upLeftRow--;
            upLeftCol--;
            console.log("Jugador: " + player + " Total: " + total);
            if (total === 4) {
                return true;
            }
        }
    
        // Reiniciar total para la otra diagonal
        total = 1;
    
        // Diagonal descendente hacia la izquierda (↙)
        let downLeftRow = row + 1;
        let downLeftCol = column - 1;
        while (downLeftRow < this.rows && downLeftCol >= 0 && this.matrix[downLeftRow][downLeftCol].getPlayer() == player) {
            total++;
            downLeftRow++;
            downLeftCol--;
            console.log("Jugador: " + player + " Total: " + total);
            if (total === 4) {
                return true;
            }
        }
    
        // Diagonal ascendente hacia la derecha (↗)
        let upRightRow = row - 1;
        let upRightCol = column + 1;
        while (upRightRow >= 0 && upRightCol < this.columns && this.matrix[upRightRow][upRightCol].getPlayer() == player) {
            total++;
            upRightRow--;
            upRightCol++;
            console.log("Jugador: " + player + " Total: " + total);
            if (total === 4) {
                return true;
            }
        }
    
        // Si no se encontraron 4 consecutivas en ninguna diagonal, devolvemos false
        return false;
    }
    


    DEBUG_RENDERMATRIZ(){
        console.table(this.matrix);
    }

    DEBUG_MATRIZELEMENTO(row,col){
        console.log(this.matrix[row][col]);
    }

}