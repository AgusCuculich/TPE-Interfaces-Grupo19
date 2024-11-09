//Representa el tablero donde se jugará. Esta compuesto por celdas (Cell).
//Esta clase se encarga de crear el tablero, insertar fichas y comprobar ganadores
class Board{

    constructor(rows, columns, centro, canvasWidth, canvasHeight) {
        this.rows = rows;
        this.columns = columns;
        this.centroTablero = centro;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.matrix = [];
        this.maxChips = this.rows * this.columns;
    }


    //Crea un tablero dinamico de Cells, las fichas de los jugadores, los huecos, y los casilleros para insertar fichas
    createBoard(p1_path,p2_path) {

        // 9 o 8 filas --> cellSize = 70
        // 7 filas --> cellSize = 80
        // 6 filas --> cellSize = 90
        const cellSize = (this.rows === 9 || this.rows === 8) ? 70 : (this.rows === 7) ? 80 : 90;
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
        const offsetX = (this.canvasWidth - boardWidth) / 1.3;
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
                let chip = new Circle(posX + cellSize / 2, posY + cellSize / 2, chipSize, './img/circulo-negro.png', false, false, null, false, row, col);
                boardElements.push(chip);
                fila.push(chip);
            }
            this.matrix.push(fila); // Agregar la fila creada a la matriz
        }

    
        // Flechas
        for (let col = 0; col < this.columns; col++) {
            const posX = offsetX + col * cellSize;
            const posY = offsetY - cellSize; 
            // En el eje y restamos el espacio dejado para las flechas, así comienzan a renderizarse por sobre las celdas con agujeros del tablero
    
            boardElements.push
            (new Circle
                (posX + cellSize / 2,
                posY + chipSize,
                chipSize * 1.1, 
                './img/flecha-indicadora.png', 
                true, 
                false,
                null,
                true,
                null,
                col
            ));
        }


        // Fichas del jugador
        //const maxChips = Math.ceil((this.rows * this.columns) / 2);
        const maxChipsPlayer = Math.floor(this.maxChips / 2);

        //j1
        const player1X = 0 + cellSize;
        let posX = player1X;
        let posY = offsetY + cellSize;
        let col = 0;

        for (let i = 0; i <= maxChipsPlayer; i++) {
            posX = player1X + col * 30;

            if (posX < offsetX - chipSize) {
                // Place Player 1's chip
                let p1_chip = new Circle(
                    posX, 
                    posY, 
                    chipSize,
                    p1_path,
                    false, 
                    true, 
                    "Jugador 1",
                    false,
                    null,
                    null
                );
                col++;
                boardElements.push(p1_chip);
            } else {

                col = 0;
                posX = player1X;
                posY += cellSize;
            }
        }

        //j2
        const player2X = 0 + cellSize;
        posX = player1X;
        posY = this.canvasHeight /2 + cellSize;
        col = 0;

        for (let i = 0; i <= maxChipsPlayer; i++) {
            posX = player2X + col * 30;

            if (posX < offsetX - chipSize) {
                let p2_chip = new Circle(
                    posX, 
                    posY, 
                    chipSize, 
                    p2_path,
                    false, 
                    true, 
                    "Jugador 2",
                    false, 
                    null, 
                    null
                );
                col++;
                boardElements.push(p2_chip);
            } else {

                col = 0;
                posX = player2X;
                posY += cellSize;
            }
        }

    
        return boardElements;
    }

    //Obtiene una ficha del tablero en una determinada posicion
    getChip(row,column){
        return this.matrix[row][column];
    }

    //Inserta una ficha en el tablero en una determinada posicion
    putChip(row,column, element) {
        this.matrix[row][column] = element;
        this.maxChips--;
    }

    getRows(){
        return this.rows;
    }
    getColumns(){
        return this.columns;
    }


    // Funciones para verificar ganador

    checkHorizontal(row, player, column, targetScore) {
        let total = 1;
    
        // Contamos hacia la derecha desde la columna actual
        let rightColumn = column + 1;
        while (rightColumn < this.columns && this.matrix[row][rightColumn].getPlayer() == player) {
            total++;
            rightColumn++;
            //console.log("Jugador: " + player + " Total: " + total);
            if (total === targetScore) {
                return true;
            }
        }
    
        // Contamos hacia la izquierda desde la columna actual
        let leftColumn = column - 1;
        while (leftColumn >= 0 && this.matrix[row][leftColumn].getPlayer() == player) {
            total++;
            leftColumn--;
            if (total === targetScore) {
                return true;
            }
        }
    
        // Si no se encontraron 4 consecutivas, devolvemos false
        return false;
    }


    checkVertical(row, player, column,targetScore) {
        let total = 1;
    
        // Contamos hacia abajo desde la fila actual
        let belowRow = row + 1;
        while (belowRow < this.rows && this.matrix[belowRow][column].getPlayer() == player) {
            total++;
            belowRow++;
            if (total === targetScore) {
                return true;
            }
        }
    
        // Contamos hacia arriba desde la fila actual
        let aboveRow = row - 1;
        while (aboveRow >= 0 && this.matrix[aboveRow][column].getPlayer() == player) {
            total++;
            aboveRow--;
            if (total === targetScore) {
                return true;
            }
        }
    
        // Si no se encontraron 4 consecutivas, devolvemos false
        return false;
    }
    
    
    checkDiagonal(row, player, column,targetScore) {
        let total = 1;
    
        // Diagonal descendente hacia la derecha (↘)
        let downRightRow = row + 1;
        let downRightCol = column + 1;
        while (downRightRow < this.rows && downRightCol < this.columns && this.matrix[downRightRow][downRightCol].getPlayer() == player) {
            total++;
            downRightRow++;
            downRightCol++;
            if (total === targetScore) {
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
            if (total === targetScore) {
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
            if (total === targetScore) {
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
            if (total === targetScore) {
                return true;
            }
        }
    
        // Si no se encontraron 4 consecutivas en ninguna diagonal, devolvemos false
        return false;
    }

    checkFull() {
        return this.maxChips == 0
    }


    //Calcular hasta que fila deberia caer la ficha (ya sabiendo su columna)
    findLandingRow(col) {
        let i = 0;
        while (i < this.rows) {
            if (this.matrix[i][col].getPlayer() !== null) {
                return i - 1; // Cuando detecta una fila ocupada, devuelve la de arriba
            }
            i++;
        }
        // Si la última fila también está vacía, devuelvo esa
        return this.rows - 1;
    }    

}