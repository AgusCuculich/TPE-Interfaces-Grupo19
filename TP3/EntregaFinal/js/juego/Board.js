class Board{

    constructor(rows, columns, centro, canvasWidth, canvasHeight) {
        this.rows = rows;
        this.columns = columns;
        this.centroTablero = centro;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.matrix = [];
    }
    
    createBoard() {

        const cellSize = (this.rows === 9) ? 70 : 80;
        const chipSize = 35;
    
        let boardElements = [];
    
        // Calcula el ancho del tablero al multiplicas la cantidad de columnas por el espacio que ocupa una celda en cada una.
        const boardWidth = this.columns * cellSize;
        // Calcula el alto del tablero al multiplicas la cantidad de filas por el espacio que ocupa una celda en cada una.
        // chipSize * 2 es el espacio extra para las flechas. Asi a la hora de encontrar la coord y donde debe empezar a dibujarse el tablero,
        // también se incluye este espacio y queda totalmente centrado.
        const boardHeight = this.rows * cellSize + chipSize * 2;
    
        // Calcula el desplazamiento para centrar el tablero en el canvas
        // Coordenadas donde debe empezar a dibujarse el tablero. Tomando en cuenta que el margen restante se divide x2 para que se centre, y
        // que debe dejar un espacio vertical para las flechas.
        const offsetX = (this.canvasWidth - boardWidth) / 2;
        const offsetY = (this.canvasHeight - boardHeight) / 2 + cellSize;
    

        // Celdas del tablero
        for (let row = 0; row < this.rows; row++) {
            const fila = []; // Crear fila
            for (let col = 0; col < this.columns; col++) {
                // Posiciona las celdas una al lado de la otra.
                const posX = offsetX + col * cellSize;
                const posY = offsetY + row * cellSize;

                // Añadir celda y círculo negro (agujero) al arreglo de elementos.
                boardElements.push(new Cell(posX, posY, cellSize, './img/patron.jpg'));
                let chip = new Circle(posX + cellSize / 2, posY + cellSize / 2, chipSize, './img/circulo-negro.png', false);
                boardElements.push(chip);
                fila.push(chip);
            }
            this.matrix.push(fila); // Agregar la fila creada a la matriz
        }

        console.table(this.matrix);

    
        // Flechas
        for (let col = 0; col < this.columns; col++) {
            const posX = offsetX + col * cellSize;
            const posY = offsetY - cellSize; 
            // En el eje y restamos el espacio dejado para las flechas, así comienzan a renderizarse por sobre las celdas con agujeros del tablero
    
            boardElements.push(new Circle(posX + cellSize / 2, posY + chipSize, chipSize, './img/flecha-indicadora.png', true));
        }


        // Fichas del jugador
        const maxChips = Math.ceil((this.rows * this.columns) / 2);

        // Posiciones de las fichas a los lados del tablero
        const player1X = offsetX - cellSize; 
        // coord x donde se posicionaran las flechas del jugador 1 del lado izq. Para esto se posiciona en el origen del tablero y le suma el
        // ancho de una celda.
        const player2X = offsetX + boardWidth + cellSize; // A la derecha del tablero
        // coord x donde se posicionaran las flechas del jugador w del lado derecho. Para esto se posiciona en el origen del tablero y le suma
        // el ancho de una celda.

        for (let i = 0; i < maxChips; i++) {
            // Calcular la posición en `Y` para que se alineen en una columna a los lados del tablero
            const posY = offsetY + i * 20;

            // Fichas del Jugador 1 (a la izquierda)
            let p1_chip = new Circle(
                player1X, 
                posY, 
                chipSize,
                './img/ficha-rojo.png', 
                false, 
                true, 
                "p1",
                false
            );

            // Fichas del Jugador 2 (a la derecha)
            let p2_chip = new Circle(player2X, posY, chipSize, './img/circulo-negro.png', false, true, "p2", false);

            boardElements.push(p1_chip);
            boardElements.push(p2_chip);
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

}