class Board extends Drawable{

    constructor(posX, posY, fill, context,rows, columns, centro){
        super(posX,posY ,fill ,context );
        this.rows = rows;
        this.columns = columns;
        this.centroTablero = centro;
    }



    createBoard() {
        console.log("aaaaaaaa");

        const cellSize = 70;
        const chipSize = 35;

        let boardElements = [];

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                // Calcula las posiciones para cada celda
                const posX = col * cellSize;
                const posY = row * cellSize + chipSize * 2; // hace este calculo para dejar espacio para las flechas
                // Añadimos las celdas al arreglo para luego ser renderizadas en su correspondiente coord.
                boardElements.push(new Cell(posX, posY, cellSize, './img/patron.jpg'));
                // Añadimos los circulos negros (agujeros) al tablero.
                boardElements.push(new Circle(posX + cellSize/2 , posY + cellSize/2, chipSize, './img/circulo-negro.png', false));
            }
        }

        for (let row = 0; row < 1; row++) {
            for (let col = 0; col < this.columns; col++) {
                const posX = col * cellSize;
                const posY = row * cellSize;
                boardElements.push(new Circle(posX + cellSize/2 , posY + cellSize/2, chipSize, './img/flecha-indicadora.png', true));
            }
        }
        return boardElements;
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